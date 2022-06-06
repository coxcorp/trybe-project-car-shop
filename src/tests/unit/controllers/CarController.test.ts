import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/CarController';
import Sinon = require('sinon');
import { Car } from '../../../interfaces/CarInterface';

chai.use(chaiHttp);

const { expect } = chai;

const controller = new CarController();

describe('Caso de sucesso no controller', () => {
  const mock =  {
    model: 'Uno da Escada',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2   
  };

  const res = {
    json: sinon.spy(),
    status: sinon.stub().returns({ json: sinon.spy() })
  } as any;

  const req = {
    body: mock as Car,
  } as any;

  before(async () => {
    sinon
      .stub(controller, 'create')
      .resolves(mock as any);
  });

  after(()=>{
    (controller.create as sinon.SinonStub).restore();
  });

  it('Testa rota create', async () => {
    await controller.create(req, res);
  });
});
