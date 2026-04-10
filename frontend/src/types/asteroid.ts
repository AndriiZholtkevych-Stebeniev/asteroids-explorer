export interface EstimatedDiameter {
    estimated_diameter_min: number
    estimated_diameter_max: number
}

export interface RelativeVelocity {
    kilometers_per_second: string
    kilometers_per_hour: string
    miles_per_hour: string
}

export interface MissDistance {
    astronomical: string
    lunar: string
    kilometers: string
    miles: string
}

export interface CloseApproachData {
    close_approach_date: string
    close_approach_date_full: string
    relative_velocity: RelativeVelocity
    miss_distance: MissDistance
    orbiting_body: string
}

export interface Asteroid {
    id: string
    name: string
    nasa_jpl_url: string
    absolute_magnitude_h: number
    estimated_diameter: {
        kilometers: EstimatedDiameter
        meters: EstimatedDiameter
        miles: EstimatedDiameter
        feet: EstimatedDiameter
    }
    is_potentially_hazardous_asteroid: boolean
    close_approach_data: CloseApproachData[]
    is_sentry_object: boolean
}

export interface NeoFeedResponse {
    element_count: number
    near_earth_objects: {
        [date: string]: Asteroid[]
    }
}