// import api from './api';

// export const listarProdutos = (params = {}) => api.get('/produtos', { params });
// export const addCarrinho = (data) => api.post('/reservaItens', data);


const mockProdutos_salgados = [
  { id: 1, nome: "Coxinha de frango", preco: 6, quantidade: 0, imagem: "coxinha-de-frango.jpg" },
  { id: 2, nome: "Pastel de carne", preco: 7, quantidade: 15, imagem: "pastel-de-carne.jpg" },
  { id: 3, nome: "Empada de frango", preco: 6, quantidade: 12, imagem: "empada-de-frango.jpg" },
  { id: 4, nome: "Kibe", preco: 5, quantidade: 20, imagem: "kibe.jpg" },
  { id: 5, nome: "Enroladinho de salsicha", preco: 4, quantidade: 18, imagem: "enroladinho-de-salsicha.jpg" },
  { id: 6, nome: "Esfirra de carne", preco: 6, quantidade: 14, imagem: "esfirra-de-carne.jpg" },
  { id: 7, nome: "Pastel de queijo", preco: 6, quantidade: 10, imagem: "pastel-de-queijo.jpg" },
  { id: 8, nome: "Risole de presunto", preco: 5, quantidade: 0, imagem: "risole-de-presunto.jpg" },
  { id: 9, nome: "Bolinha de queijo", preco: 5, quantidade: 25, imagem: "bolinha-de-queijo.jpg" },
  { id: 10, nome: "Croquete", preco: 5, quantidade: 9, imagem: "croquete.jpg" },
  { id: 11, nome: "Empada de palmito", preco: 7, quantidade: 11, imagem: "empada-de-palmito.jpg" },
  { id: 12, nome: "Mini pizza", preco: 6, quantidade: 0, imagem: "mini-pizza.jpg" },
  { id: 13, nome: "Pão de queijo", preco: 4, quantidade: 30, imagem: "pao-de-queijo.jpg" },
  { id: 14, nome: "Esfirra de frango", preco: 6, quantidade: 13, imagem: "esfirra-de-frango.jpg" },
  { id: 15, nome: "Pastel de frango", preco: 7, quantidade: 8, imagem: "pastel-de-frango.jpg" },
  { id: 16, nome: "Torta salgada", preco: 8, quantidade: 6, imagem: "torta-salgada.jpg" },
  { id: 17, nome: "Hamburguer artesanal", preco: 12, quantidade: 0, imagem: "hamburguer-artesanal.jpg" },
  { id: 18, nome: "Hot dog", preco: 10, quantidade: 7, imagem: "hot-dog.jpg" },
  { id: 19, nome: "Cachorro quente simples", preco: 8, quantidade: 5, imagem: "cachorro-quente-simples.jpg" },
  { id: 20, nome: "Pastel de calabresa", preco: 7, quantidade: 16, imagem: "pastel-de-calabresa.jpg" }
];
const mockProdutos_doces = [
  { id: 21, nome: "Brigadeiro", preco: 3, quantidade: 25, imagem: "brigadeiro.jpg" },
  { id: 22, nome: "Beijinho", preco: 3, quantidade: 0, imagem: "beijinho.jpg" },
  { id: 23, nome: "Bolo de chocolate", preco: 8, quantidade: 10, imagem: "bolo-de-chocolate.jpg" },
  { id: 24, nome: "Pudim", preco: 7, quantidade: 0, imagem: "pudim.jpg" },
  { id: 25, nome: "Mousse de maracujá", preco: 6, quantidade: 9, imagem: "mousse-de-maracuja.jpg" },
  { id: 26, nome: "Torta de limão", preco: 8, quantidade: 5, imagem: "torta-de-limao.jpg" },
  { id: 27, nome: "Bolo de cenoura", preco: 7, quantidade: 12, imagem: "bolo-de-cenoura.jpg" },
  { id: 28, nome: "Doce de leite", preco: 4, quantidade: 0, imagem: "doce-de-leite.jpg" },
  { id: 29, nome: "Paçoca", preco: 2, quantidade: 40, imagem: "pacoca.jpg" },
  { id: 30, nome: "Cocada", preco: 3, quantidade: 18, imagem: "cocada.jpg" },
  { id: 31, nome: "Queijadinha", preco: 4, quantidade: 7, imagem: "queijadinha.jpg" },
  { id: 32, nome: "Torta de chocolate", preco: 9, quantidade: 0, imagem: "torta-de-chocolate.jpg" },
  { id: 33, nome: "Cupcake", preco: 5, quantidade: 14, imagem: "cupcake.jpg" },
  { id: 34, nome: "Geladinho", preco: 3, quantidade: 22, imagem: "geladinho.jpg" },
  { id: 35, nome: "Arroz doce", preco: 5, quantidade: 6, imagem: "arroz-doce.jpg" },
  { id: 36, nome: "Canjica", preco: 5, quantidade: 0, imagem: "canjica.jpg" },
  { id: 37, nome: "Pé de moleque", preco: 3, quantidade: 19, imagem: "pe-de-moleque.jpg" },
  { id: 38, nome: "Bombom", preco: 4, quantidade: 11, imagem: "bombom.jpg" },
  { id: 39, nome: "Bala de coco", preco: 1, quantidade: 50, imagem: "bala-de-coco.jpg" },
  { id: 40, nome: "Sonho recheado", preco: 6, quantidade: 8, imagem: "sonho-recheado.jpg" }
];
const mockProdutos_bebidas = [
  { id: 41, nome: "Coca-Cola lata", preco: 5, quantidade: 30, imagem: "coca-cola-lata.jpg" },
  { id: 42, nome: "Guaraná lata", preco: 5, quantidade: 0, imagem: "guarana-lata.jpg" },
  { id: 43, nome: "Suco de laranja", preco: 6, quantidade: 12, imagem: "suco-de-laranja.jpg" },
  { id: 44, nome: "Água mineral", preco: 3, quantidade: 50, imagem: "agua-mineral.jpg" },
  { id: 45, nome: "Refrigerante 2L", preco: 10, quantidade: 0, imagem: "refrigerante-2l.jpg" },
  { id: 46, nome: "Suco de uva", preco: 6, quantidade: 8, imagem: "suco-de-uva.jpg" },
  { id: 47, nome: "Suco de maracujá", preco: 6, quantidade: 10, imagem: "suco-de-maracuja.jpg" },
  { id: 48, nome: "Café", preco: 4, quantidade: 20, imagem: "cafe.jpg" },
  { id: 49, nome: "Capuccino", preco: 6, quantidade: 7, imagem: "capuccino.jpg" },
  { id: 50, nome: "Chocolate quente", preco: 7, quantidade: 0, imagem: "chocolate-quente.jpg" },
  { id: 51, nome: "Chá gelado", preco: 5, quantidade: 9, imagem: "cha-gelado.jpg" },
  { id: 52, nome: "Suco de abacaxi", preco: 6, quantidade: 11, imagem: "suco-de-abacaxi.jpg" },
  { id: 53, nome: "Água com gás", preco: 4, quantidade: 13, imagem: "agua-com-gas.jpg" },
  { id: 54, nome: "Energético", preco: 12, quantidade: 5, imagem: "energetico.jpg" },
  { id: 55, nome: "Leite", preco: 4, quantidade: 0, imagem: "leite.jpg" },
  { id: 56, nome: "Vitamina de banana", preco: 7, quantidade: 6, imagem: "vitamina-de-banana.jpg" },
  { id: 57, nome: "Suco detox", preco: 8, quantidade: 4, imagem: "suco-detox.jpg" },
  { id: 58, nome: "Água de coco", preco: 5, quantidade: 15, imagem: "agua-de-coco.jpg" },
  { id: 59, nome: "Refrigerante zero", preco: 5, quantidade: 0, imagem: "refrigerante-zero.jpg" },
  { id: 60, nome: "Suco de acerola", preco: 6, quantidade: 9, imagem: "suco-de-acerola.jpg" }
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