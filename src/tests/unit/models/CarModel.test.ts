import { expect } from 'chai';
import sinon from 'sinon'
import CarModel from '../../../models/CarModel';
import { Car } from '../../../interfaces/CarInterface';

const model = new CarModel();

describe('Caso de sucesso no model', () => {
  before(() => {
    sinon.stub(model, 'create');     
    sinon.stub(model, 'readOne');     
  });

  after(() => {
    (model.create as sinon.SinonStub).restore();
    (model.readOne as sinon.SinonStub).restore();
  });

  const mock = {
    model: 'Uno da Escada',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2 
  };

  it('Testa rota create', async () => {
    (model.create as sinon.SinonStub).resolves(mock);
    expect(await model.create({} as Car)).to.be.equal(mock);
  });

  it('Testa rota findOne', async () => {
    const id = '123456';
    (model.readOne as sinon.SinonStub).resolves(mock);
    expect(await model.readOne(id)).to.be.equal(mock);
  });
});
