import { serializeCookie } from '@/lib/cookie';
import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest, res: NextResponse) {
  // const cookie = serializeCookie('auth', { user: 'Andy' }, { path: '/' });
  // return Response.json(
  //   { login: true },
  //   {
  //     headers: {
  //       'Set-Cookie': cookie,
  //     },
  //   }
  // );

  const body = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    console.log('user', user);
    if (!user) {
      return new NextResponse(
        'Invalid username or password.Please try again.',
        {
          status: 401,
        }
      );
    } else {
      const isPasswordCorrect = user?.password === body?.password;
      if (!isPasswordCorrect) {
        return new NextResponse(
          'Invalid username or password.Please try again.',
          {
            status: 401,
          }
        );
      }
    }

    const token = jwt.sign({ userId: user?.email }, 'JWT_SECRET', {
      expiresIn: '1h',
    });

    const cookie = serializeCookie(
      'auth',
      { user: user.username },
      { path: '/' }
    );

    return NextResponse.json(
      { login: true, status: 200, token },
      {
        headers: {
          'Set-Cookie': cookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
