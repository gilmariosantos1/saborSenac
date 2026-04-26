// import api from './api';

// export const listarProdutos = (params = {}) => api.get('/produtos', { params });
// export const adcionarAoCarrinho = (data) => api.post('/produtos', data);


const mockProdutos_salgados = [
  {
    id: 1,
    nome: "Coxinha de frango",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 10
  },
  {
    id: 2,
    nome: "Pastel de carne",
    preco: 7,
    quantidade_atual: 1,
    quantidade: 15
  },
  {
    id: 3,
    nome: "Empada de frango",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 12
  },
  {
    id: 4,
    nome: "Kibe",
    preco: 5,
    quantidade_atual: 1,
    quantidade: 20
  },
  {
    id: 5,
    nome: "Enroladinho de salsicha",
    preco: 4,
    quantidade_atual: 1,
    quantidade: 18
  },
  {
    id: 6,
    nome: "Esfirra de carne",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 14
  }
];
const mockProdutos_doces = [
  {
    id: 101,
    nome: "Bolo de chocolate",
    preco: 8,
    quantidade_atual: 1,
    quantidade: 10
  },
  {
    id: 102,
    nome: "Brigadeiro",
    preco: 3,
    quantidade_atual: 1,
    quantidade: 25
  },
  {
    id: 103,
    nome: "Beijinho",
    preco: 3,
    quantidade_atual: 1,
    quantidade: 20
  },
  {
    id: 104,
    nome: "Pudim",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 8
  },
  {
    id: 105,
    nome: "Torta de limão",
    preco: 9,
    quantidade_atual: 1,
    quantidade: 6
  }
];
const mockProdutos_bebidas = [
  {
    id: 201,
    nome: "Suco de laranja",
    preco: 5,
    quantidade_atual: 1,
    quantidade: 25
  },
  {
    id: 202,
    nome: "Refrigerante lata",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 30
  },
  {
    id: 203,
    nome: "Água mineral",
    preco: 3,
    quantidade_atual: 1,
    quantidade: 40
  },
  {
    id: 204,
    nome: "Suco de acerola",
    preco: 5,
    quantidade_atual: 1,
    quantidade: 18
  },
  {
    id: 205,
    nome: "Refrigerante 2L",
    preco: 10,
    quantidade_atual: 1,
    quantidade: 12
  }
];

export async function listarProdutos(categoria) {
    return new Promise((resolve) => {
        setTimeout(() => {
            switch (categoria) {
                case "salgados":
                  resolve({
                    data: mockProdutos_salgados
                });
                break;
                case "doces":
                    resolve({
                    data: mockProdutos_doces
                });
                break;
                case "bebidas":
                    resolve({
                    data: mockProdutos_bebidas
                });
                break;
                default: 
                resolve({
                    data: mockProdutos_salgados
                });
            }

            resolve({
                data: mockProdutos
            });
        }, 500);
    });
}