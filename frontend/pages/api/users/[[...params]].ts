import type {NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

type AxiosErrorWithResponse = AxiosError &  { response: { status: number; data: any}};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, body, query } = req;
    const apiUrl = process.env.BACKEND_URL || 'http://localhost:3000/api/users';

    try {
        const response = await axios({
            method,
            url: `${apiUrl}${req.url}`,
            data: body,
            params: query
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        // Error can happen from sources outside axios as well
        if(isAxiosErrorWithResponse(error)) {
            const { response } = error;
            res.status(response?.status || 500).json(response?.data || 'Internal Server Error');
        } else {
            res.status(500).json('Internal Server Error');
        }

    }
}

function isAxiosErrorWithResponse(error: any): error is AxiosErrorWithResponse {
    return error.isAxiosError && 'response' in error;
}

export default handler;