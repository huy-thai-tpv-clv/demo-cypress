import { validatePassword } from '@/utils/helper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';


export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log('body', body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: 'This email was taken!',
        },
        { status: 400 }
      );
    } else {
      const validateResult = validatePassword(body.password);
      if (!validateResult?.error) {
        const newUser = await prisma.user.create({
          data: {
            email: body.email,
            password: body.password,
            username: body?.username || 'default',
          },
        });

        return NextResponse.json(newUser, {
          status: 200,
        });
      } else {
        return NextResponse.json(
          {
            message: validateResult.error,
          },
          {
            status: 400,
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
