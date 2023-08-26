export interface AsteroidDataType {
  id: string;
  name: string;
  approachDate: string;
  diameter: number;
  isHazard?: boolean;
  missDistance: {
    lunar: string;
    km: string;
  };
  velocity: {
    sec: string;
    hour: string;
  };
  fullApproachDate: string;
  orbitingBody: string;
}

export interface AsteroidsListDataType {
  asteroids: Array<AsteroidDataType>;
  nextPage: number;
}

export interface AsteroidResponseType {
  id: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  name: string;
  close_approach_data: [
    {
      close_approach_date_full: string;
      relative_velocity: {
        kilometers_per_second: string;
        kilometers_per_hour: string;
        miles_per_hour: string;
      };
      miss_distance: {
        astronomical: string;
        lunar: string;
        kilometers: string;
      };
      orbiting_body: string;
    },
  ];
}

export interface AsteroidCloseApproachResponseData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
  };
  miss_distance: {
    lunar: string;
    kilometers: string;
  };
  orbiting_body: string;
}
