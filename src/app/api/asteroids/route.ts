import { addDays, format, isValid, parseISO } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import { AsteroidResponseType, AsteroidsListDataType } from '@/libs/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = parseISO(searchParams.get('start_date') ?? '');
  if (!isValid(startDate)) {
    return new NextResponse(`error parsing date ${searchParams.get('start_date')}`);
  }
  const page = searchParams.get('page') ?? 0;
  const date = format(addDays(startDate, +page), 'yyyy-MM-dd');
  const apiReqUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${process.env.API_KEY}`;

  const responseData = await (await fetch(apiReqUrl)).json();
  const asteroidsFromResponse = responseData['near_earth_objects'][
    date
  ] as Array<AsteroidResponseType>;
  const data: AsteroidsListDataType = {
    asteroids: asteroidsFromResponse.map((item) => ({
      id: item.id,
      name: item.name,
      approachDate: date,
      diameter:
        (item.estimated_diameter.meters.estimated_diameter_min +
          item.estimated_diameter.meters.estimated_diameter_max) /
        2,
      missDistance: {
        km: item.close_approach_data[0].miss_distance.kilometers,
        lunar: item.close_approach_data[0].miss_distance.lunar,
      },
      isHazard: item.is_potentially_hazardous_asteroid,
    })),
    nextPage: +page + 1,
  };
  return new NextResponse(JSON.stringify(data));
}
