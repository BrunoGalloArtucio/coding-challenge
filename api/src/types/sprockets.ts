export type Sprocket = {
    id: string;
    teeth: number;
    pitch_diameter: number;
    outside_diameter: number;
    pitch: number;
};

export type Factory = {
    id: string;
    chart_data: {
        sprocket_production_actual: number[];
        sprocket_production_goal: number[];
        time: number[];
    };
};

export type SprocketData = Omit<Sprocket, "id">;
