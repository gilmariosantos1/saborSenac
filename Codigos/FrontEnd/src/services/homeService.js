// import api from './api';

// export const listarProdutos = (params = {}) => api.get('/produtos', { params });
// export const addCarrinho = (data) => api.post('/produtos', data);


const mockProdutos_salgados = [
  { id: 1, nome: "Coxinha de frango", preco: 6, quantidade: 0 },
  { id: 2, nome: "Pastel de carne", preco: 7, quantidade: 15 },
  { id: 3, nome: "Empada de frango", preco: 6, quantidade: 12 },
  { id: 4, nome: "Kibe", preco: 5, quantidade: 20 },
  { id: 5, nome: "Enroladinho de salsicha", preco: 4, quantidade: 18 },
  { id: 6, nome: "Esfirra de carne", preco: 6, quantidade: 14 },
  { id: 7, nome: "Pastel de queijo", preco: 6, quantidade: 10 },
  { id: 8, nome: "Risole de presunto", preco: 5, quantidade: 0 },
  { id: 9, nome: "Bolinha de queijo", preco: 5, quantidade: 25 },
  { id: 10, nome: "Croquete", preco: 5, quantidade: 9 },
  { id: 11, nome: "Empada de palmito", preco: 7, quantidade: 11 },
  { id: 12, nome: "Mini pizza", preco: 6, quantidade: 0 },
  { id: 13, nome: "Pão de queijo", preco: 4, quantidade: 30 },
  { id: 14, nome: "Esfirra de frango", preco: 6, quantidade: 13 },
  { id: 15, nome: "Pastel de frango", preco: 7, quantidade: 8 },
  { id: 16, nome: "Torta salgada", preco: 8, quantidade: 6 },
  { id: 17, nome: "Hamburguer artesanal", preco: 12, quantidade: 0 },
  { id: 18, nome: "Hot dog", preco: 10, quantidade: 7 },
  { id: 19, nome: "Cachorro quente simples", preco: 8, quantidade: 5 },
  { id: 20, nome: "Pastel de calabresa", preco: 7, quantidade: 16 }
];
const mockProdutos_doces = [
  { id: 21, nome: "Brigadeiro", preco: 3, quantidade: 25 },
  { id: 22, nome: "Beijinho", preco: 3, quantidade: 0 },
  { id: 23, nome: "Bolo de chocolate", preco: 8, quantidade: 10 },
  { id: 24, nome: "Pudim", preco: 7, quantidade: 0 },
  { id: 25, nome: "Mousse de maracujá", preco: 6, quantidade: 9 },
  { id: 26, nome: "Torta de limão", preco: 8, quantidade: 5 },
  { id: 27, nome: "Bolo de cenoura", preco: 7, quantidade: 12 },
  { id: 28, nome: "Doce de leite", preco: 4, quantidade: 0 },
  { id: 29, nome: "Paçoca", preco: 2, quantidade: 40 },
  { id: 30, nome: "Cocada", preco: 3, quantidade: 18 },
  { id: 31, nome: "Queijadinha", preco: 4, quantidade: 7 },
  { id: 32, nome: "Torta de chocolate", preco: 9, quantidade: 0 },
  { id: 33, nome: "Cupcake", preco: 5, quantidade: 14 },
  { id: 34, nome: "Geladinho", preco: 3, quantidade: 22 },
  { id: 35, nome: "Arroz doce", preco: 5, quantidade: 6 },
  { id: 36, nome: "Canjica", preco: 5, quantidade: 0 },
  { id: 37, nome: "Pé de moleque", preco: 3, quantidade: 19 },
  { id: 38, nome: "Bombom", preco: 4, quantidade: 11 },
  { id: 39, nome: "Bala de coco", preco: 1, quantidade: 50 },
  { id: 40, nome: "Sonho recheado", preco: 6, quantidade: 8 }
];
const mockProdutos_bebidas = [
  { id: 41, nome: "Coca-Cola lata", preco: 5, quantidade: 30 },
  { id: 42, nome: "Guaraná lata", preco: 5, quantidade: 0 },
  { id: 43, nome: "Suco de laranja", preco: 6, quantidade: 12 },
  { id: 44, nome: "Água mineral", preco: 3, quantidade: 50 },
  { id: 45, nome: "Refrigerante 2L", preco: 10, quantidade: 0 },
  { id: 46, nome: "Suco de uva", preco: 6, quantidade: 8 },
  { id: 47, nome: "Suco de maracujá", preco: 6, quantidade: 10 },
  { id: 48, nome: "Café", preco: 4, quantidade: 20 },
  { id: 49, nome: "Capuccino", preco: 6, quantidade: 7 },
  { id: 50, nome: "Chocolate quente", preco: 7, quantidade: 0 },
  { id: 51, nome: "Chá gelado", preco: 5, quantidade: 9 },
  { id: 52, nome: "Suco de abacaxi", preco: 6, quantidade: 11 },
  { id: 53, nome: "Água com gás", preco: 4, quantidade: 13 },
  { id: 54, nome: "Energético", preco: 12, quantidade: 5 },
  { id: 55, nome: "Leite", preco: 4, quantidade: 0 },
  { id: 56, nome: "Vitamina de banana", preco: 7, quantidade: 6 },
  { id: 57, nome: "Suco detox", preco: 8, quantidade: 4 },
  { id: 58, nome: "Água de coco", preco: 5, quantidade: 15 },
  { id: 59, nome: "Refrigerante zero", preco: 5, quantidade: 0 },
  { id: 60, nome: "Suco de acerola", preco: 6, quantidade: 9 }
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
                data: mockProdutos_salgados
            });
        }, 500);
    });
}