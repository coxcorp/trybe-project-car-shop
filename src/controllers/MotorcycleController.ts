import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const bike = await this.service.create(body);
      if (!bike) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in bike) {
        return res.status(400).json(bike);
      }
      return res.status(201).json(bike);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const bikes = await this.service.read();
      return res.status(200).json(bikes);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      const bike = await this.service.readOne(id);
      return bike
        ? res.status(200).json(bike)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<(typeof res
    ) | void> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      const { body } = req;

      const bike = await this.service.update(id, body);

      if (!bike) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in bike) return res.status(400).json(bike);

      return res.status(200).end();
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<(typeof res
    ) | void> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      const bike = await this.service.delete(id);
      return bike
        ? res.status(204).end()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;
