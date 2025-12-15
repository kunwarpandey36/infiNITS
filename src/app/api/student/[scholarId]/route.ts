
import { NextResponse } from 'next/server';
import studentData from '@/lib/student-data.json';

export async function GET(request: Request, { params }: { params: { scholarId: string } }) {
    const { scholarId } = params;
    const student = studentData.find(s => s.scholarId === scholarId);

    if (student) {
        return NextResponse.json(student);
    } else {
        return new NextResponse('Student not found', { status: 404 });
    }
}
