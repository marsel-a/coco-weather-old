// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { q } = req.query;
  const data = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}`).then((response) =>
    response.json()
  );

  res.status(200).json(data);
}

