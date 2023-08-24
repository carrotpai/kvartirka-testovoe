import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	context: { params: { id: string } }
) {
	const params = new URLSearchParams(request.url);
	return new NextResponse(`from asteroid ${context.params.id}`);
}
