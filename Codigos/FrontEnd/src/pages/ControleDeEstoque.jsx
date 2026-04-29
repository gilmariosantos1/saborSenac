import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/ControleDeEstoque.module.css';
import Header from '../components/header';
import icon1 from '../assets/Edit.png';
import icon2 from '../assets/add_circle.png';
import icon3 from '../assets/Trash.png';

const ITENS_POR_PAGINA = 10;

//Observação: O código abaixo é apenas um exemplo de como implementar a funcionalidade de controle de estoque com paginação. Ele não inclui as funcionalidades de edição, adição e exclusão de produtos, que devem ser implementadas separadamente.

export default function ControleDeEstoque() {
    const [produtos, setProdutos] = useState([
        { id: 1, nome: 'Coca-cola', quantidade: 3, categoria: 'Bebidas', valor: 8.00 },
        { id: 2, nome: 'Pastel', quantidade: 5, categoria: 'Salgado', valor: 5.00 },
        { id: 3, nome: 'Coxinha', quantidade: 6, categoria: 'Salgado', valor: 4.00 },
        { id: 4, nome: 'Bauru', quantidade: 2, categoria: 'Salgado', valor: 6.50 },
        { id: 5, nome: 'Enroladinho', quantidade: 3, categoria: 'Salgado', valor: 3.50 },
        { id: 6, nome: 'Pizza', quantidade: 12, categoria: 'Salgado', valor: 12.00 },
        { id: 7, nome: 'Hamburguer', quantidade: 8, categoria: 'Salgado', valor: 13.00 },
        { id: 8, nome: 'Brigadeiro', quantidade: 9, categoria: 'Doces', valor: 2.50 },
        { id: 9, nome: 'Pudim', quantidade: 14, categoria: 'Doces', valor: 5.50 },
        { id: 10, nome: 'Bolo de Chocolate', quantidade: 4, categoria: 'Doces', valor: 8.00 },
        { id: 11, nome: 'Refrigerante', quantidade: 20, categoria: 'Bebidas', valor: 4.50 },
        { id: 12, nome: 'Água', quantidade: 50, categoria: 'Bebidas', valor: 2.00 },
        { id: 13, nome: 'Suco Natural', quantidade: 10, categoria: 'Bebidas', valor: 6.00 },
        { id: 14, nome: 'Acarajé', quantidade: 7, categoria: 'Salgado', valor: 7.00 },
        { id: 15, nome: 'Quibe', quantidade: 11, categoria: 'Salgado', valor: 3.00 },
    ]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    
    const totalPaginas = Math.ceil(produtos.length / ITENS_POR_PAGINA);
    const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const indiceFinal = indiceInicial + ITENS_POR_PAGINA;
    const produtosPaginados = produtos.slice(indiceInicial, indiceFinal);

    const irParaPagina = (numeroPagina) => {
        if (numeroPagina > 0 && numeroPagina <= totalPaginas) {
            setPaginaAtual(numeroPagina);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.tabela}>
                <div className={styles.header}>
                    <span>Nome:</span>
                    <span>Quantidade:</span>
                    <span>Categoria</span>
                    <span>Valor:</span>
                    <span></span>
                </div>

                {produtosPaginados.map((p) => (
                    <div key={p.id} className={styles.row}>
                        <span>{p.nome}</span>
                        <span>{p.quantidade}</span>
                        <span>{p.categoria}</span>
                        <span>R$ {p.valor}</span>

                        <div className={styles.actions}>
                            <Link to={`/editar/${p.id}`}>
                                <img src={icon1} alt="Editar" />
                            </Link>

                            <Link to={`/adicionar/${p.id}`}>
                                <img src={icon2} alt="Adicionar" />
                            </Link>

                            <Link to={`/deletar/${p.id}`}>
                                <img src={icon3} alt="Deletar" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.paginacao}>
                <button 
                    className={styles.botao} 
                    onClick={() => irParaPagina(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                >
                    ← Anterior
                </button>

                <div className={styles.numeroPaginas}>
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                        <button
                            key={numero}
                            className={`${styles.numeroPagina} ${paginaAtual === numero ? styles.ativo : ''}`}
                            onClick={() => irParaPagina(numero)}
                        >
                            {numero}
                        </button>
                    ))}
                </div>

                <button 
                    className={styles.botao} 
                    onClick={() => irParaPagina(paginaAtual + 1)}
                    disabled={paginaAtual === totalPaginas}
                >
                    Próximo →
                </button>
            </div>

            <div className={styles.infoPages}>
                Página {paginaAtual} de {totalPaginas}
            </div>
        </>
    )
}