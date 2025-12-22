
import { NextResponse } from 'next/server';
import { mergedStudentData } from '@/lib/nit-silchar-student-data';

export async function GET(request: Request, { params }: { params: { scholarId: string } }) {
    const { scholarId } = params;
    const student = mergedStudentData.find(s => s.scholarId === scholarId);

    if (student) {
        return NextResponse.json(student);
    } else {
        return new NextResponse('Student not found', { status: 404 });
    }
}
