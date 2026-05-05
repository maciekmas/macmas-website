import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Sekret, który musisz dodać w Vercel i Sanity
const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string; slug?: { current: string } }>(
      req,
      secret
    );

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Odświeżamy stronę główną i listę portfolio przy każdej zmianie
    revalidatePath('/');
    revalidatePath('/portfolio');

    // Jeśli zmieniono konkretny projekt, odświeżamy jego podstronę
    if (body._type === 'project' && body.slug?.current) {
      revalidatePath(`/portfolio/${body.slug.current}`);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 500 });
  }
}
