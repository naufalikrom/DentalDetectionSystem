import axios from "axios";

interface DetectedImage {
    id: number;
    id_panoramic_image: number;
    detected_image_url: string;
    result_detection_images: {
        [key: string]: {
            cropped_image_url: string;
            cropped_squared_image_url: string;
            detection_desease_result: string;
        };
    };
}


export const PutDetection = ({ no_rm, callback }: {
    no_rm: string,
    callback: (success: boolean, dataOrError: DetectedImage | Error) => void
}) => {
    let isResponseReceived = false;

    // Timeout 2 menit (120000 ms)
    const timeout = setTimeout(() => {
        if (!isResponseReceived) {
            console.warn("Timeout: No response received from API.");
            callback(false, new Error("Request timeout after 2 minutes"));
        }
    }, 120000);

    axios.put(`http://localhost:8000/api/v1/detected/${no_rm}`)
        .then((res) => {
            isResponseReceived = true;
            clearTimeout(timeout); // Hapus timeout jika respons diterima
            callback(true, res.data);
            // console.log("norm putdetection: ", { no_rm })
            // console.log("data putdetection: ", { res })
        })
        .catch((error) => {
            isResponseReceived = true;
            clearTimeout(timeout); // Hapus timeout jika terjadi error

            if (axios.isAxiosError(error) && error.response) {
                callback(false, new Error(error.response.data.detail || "Unknown error"));
            } else {
                callback(false, error as Error);
            }
        });
};




export const GetDetected = async ({ no_rm, callback }: {
    no_rm: string,
    callback: (success: boolean, dataOrError: DetectedImage | Error) => void
}) => {

    try {
        const res = await axios.get(`http://localhost:8000/api/v1/detected/${no_rm}`);
        callback(true, res.data[0]);
        // console.log("norm: ", { no_rm })
        // console.log("data: ", { res })
    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            callback(false, new Error(error.response.data.detail || "Unknown error"));
        } else {
            callback(false, error as Error);
        }
    }
};
