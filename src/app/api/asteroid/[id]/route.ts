import { NextRequest, NextResponse } from 'next/server';
import {
  AsteroidCloseApproachResponseData,
  AsteroidDataType,
  AsteroidResponseType,
} from '@/libs/types';
import { binarySearchForAsteroids } from '@/libs/utils';
import { format } from 'date-fns';

interface OneAsteroidResponseType extends AsteroidResponseType {
  close_approach_data: any;
}

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const apiReqUrl = `https://api.nasa.gov/neo/rest/v1/neo/${context.params.id}?api_key=${process.env.API_KEY}`;
  const responseData = (await (await fetch(apiReqUrl)).json()) as OneAsteroidResponseType;
  const now = Date.now();
  const asteroidData = responseData[
    'close_approach_data'
  ] as Array<AsteroidCloseApproachResponseData>;
  const { findInd, leftInd, rightInd } = binarySearchForAsteroids(
    asteroidData,
    format(now, 'yyyy-MM-dd')
  );
  //остортировать в порядке увеличения разницы дат (получить наиближайшее)
  const info = [asteroidData[leftInd], asteroidData[rightInd], asteroidData[findInd]].sort(
    (a, b) => now - b.epoch_date_close_approach - (now - a.epoch_date_close_approach)
  )[0];
  const data: AsteroidDataType = {
    id: responseData.id,
    name: responseData.name,
    approachDate: info.close_approach_date,
    diameter:
      (responseData.estimated_diameter.meters.estimated_diameter_min +
        responseData.estimated_diameter.meters.estimated_diameter_max) /
      2,
    missDistance: {
      km: info.miss_distance.kilometers,
      lunar: info.miss_distance.lunar,
    },
    isHazard: responseData.is_potentially_hazardous_asteroid,
    velocity: {
      sec: info.relative_velocity.kilometers_per_second,
      hour: info.relative_velocity.kilometers_per_hour,
    },
    fullApproachDate: info.close_approach_date_full,
    orbitingBody: info.orbiting_body,
  };
  return new NextResponse(JSON.stringify(data));
}
