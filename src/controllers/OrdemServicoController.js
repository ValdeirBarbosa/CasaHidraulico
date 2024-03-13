const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class OrdemServicoController {

  async create(request, response) {
    const { user_id } = request.params
    const { cliente_id, descricao_os, produtos } = request.body

    const [currentUser] = await knex("user").where({ id: user_id });
    const [currentCliente] = await knex("cliente").where({ id: cliente_id });
    console.log(currentCliente);
    if (!currentUser || !currentCliente) {
      throw new AppError("Usuario / Cliente  nao existe")
    }
    let [ordemServicoId] = await knex("ordem_servico").insert({ user_id, cliente_id, descricao_os })
    let orderServicoDados = []
   
    for(let prd of produtos){
      console.log(typeof (prd.prod_qtd));
      orderServicoDados.push({
        cliente_id,
        user_id,
        os_id: ordemServicoId,
        produto_id: prd.produto_id,
        prod_qtd: parseInt(prd.prod_qtd)

      })
      console.log(orderServicoDados)
    }

    await knex("item_ordem_servico").insert((orderServicoDados))

    return response.json(orderServicoDados)
  }

  async show(request, response){
    const{os_id} = request.params

    const osSelected = await knex("ordem_servico")
    .select()
    .where({ 'ordem_servico.id': os_id })                 
    if(!osSelected){
      throw new AppError("Ordem de serviço inexistente!",400)
    }
    console.log(osSelected);
    const itemsOs = await knex('item_ordem_servico').select('*').where({ os_id })

    return response.status(201).json({ osSelected, itemsOs });
   
  }

}
module.exports = OrdemServicoController