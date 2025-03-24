import axios from "axios";


interface PanoramicImage {
    id: number;
    id_user: number;
    no_rm: string;
    image_url: string;
}

export const PostPanoramic = async ({ data, callback }: {
    data: FormData,
    callback: (success: boolean, dataOrError: any | Error) => void
}) => {
    try {
        const res = await axios.post('http://localhost:8000/api/v1/panoramic', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        callback(true, res.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            callback(false, error.response.data.detail || "Unknown error");
        } else {
            callback(false, error as Error);
        }
    }
};

export const EditPanoramic = async ({ no_rm, file, callback }: {
    no_rm: string,
    file: any,
    callback: (success: boolean, dataOrError: PanoramicImage | Error) => void;
}) => {
    try {
        const res = await axios.put(`http://localhost:8000/api/v1/panoramic/${no_rm}`, file, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        callback(true, res.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            callback(false, error.response.data.detail || "Unknown error");
        } else {
            callback(false, error as Error);
        }
    }
}


export const GetPanoramic = async ({ id_user, page, limit, callback }: {
    id_user: number,
    page: number,
    limit: number,
    callback: (success: boolean, dataOrError: PanoramicImage | Error) => void;
}) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/v1/panoramic/`, {
            params: {
                id_user: id_user,
                page: page,
                limit: limit
            }
        });
        callback(true, res.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            callback(false, error.response.data.detail || "Unknown error");
        } else {
            callback(false, error as Error);
        }
    }
}

export const GetPanoramicByNoRm = async ({ no_rm, callback }: {
    no_rm: string,
    callback: (success: boolean, dataOrError: PanoramicImage | Error) => void;
}) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/v1/panoramic/${no_rm}`);
        callback(true, res.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            callback(false, error.response.data.detail || "Unknown error");
        } else {
            callback(false, error as Error)
        }
    }
}


export const DeletePanoramic = async ({ no_rm, callback }: {
    no_rm: string,
    callback: (success: boolean, dataOrError: string | Error) => void
}) => {
    try {
        const res = await axios.delete(`http://localhost:8000/api/v1/panoramic/${no_rm}`);
        callback(true, res.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            callback(false, error.response.data.detail || "Unknown error");
        } else {
            callback(false, error as Error);
        }
    }
}