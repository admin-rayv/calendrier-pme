import { NextRequest, NextResponse } from 'next/server';

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Email invalide' },
        { status: 400 }
      );
    }

    // If no API key, just simulate success (for development)
    if (!BUTTONDOWN_API_KEY) {
      console.log('Simulated subscription for:', email);
      return NextResponse.json({
        success: true,
        message: 'Inscription réussie! Vérifiez vos emails.',
      });
    }

    // Subscribe via Buttondown API
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        tags: ['calendrier-pme'],
      }),
    });

    if (response.status === 201) {
      return NextResponse.json({
        success: true,
        message: 'Inscription réussie! Vérifiez vos emails.',
      });
    }

    if (response.status === 409) {
      return NextResponse.json(
        { success: false, error: 'Cet email est déjà inscrit' },
        { status: 409 }
      );
    }

    throw new Error('Buttondown API error');
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur, veuillez réessayer' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
