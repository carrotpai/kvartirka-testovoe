import { AsteroidCloseApproachResponseData } from '@/libs/types';

export function binarySearchForAsteroids(
  arr: Array<AsteroidCloseApproachResponseData>,
  searchDate: string
) {
  let l = 0;
  let r = arr.length - 1;
  let mid;
  while (r >= l) {
    mid = l + Math.floor((r - l) / 2);
    if (arr[mid].close_approach_date === searchDate)
      return { findInd: mid, leftInd: l, rightInd: r };
    if (arr[mid].close_approach_date > searchDate) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return { findInd: mid ?? 0, leftInd: l, rightInd: r };
}
