import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const publicKey = process.env.IK_PUBLIC_KEY;
const privateKey = process.env.IK_PRIVATE_KEY;

export async function POST(request) {
  const body = await request.json();
  const { uploadPayload, expire } = body;

  const token = jwt.sign(
    uploadPayload,
    privateKey,
    {
      expiresIn: expire,
      header: {
        alg: "HS256",
        typ: "JWT",
        kid: publicKey,
      },
    }
  );

  return NextResponse.json({ token });
}