import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// Colunas e JOINs compartilhados pelas duas rotas.
// LEFT JOIN: produtos sem modelo 3D também aparecem (modelo_3d = null).
// preco::float8 converte NUMERIC para número (o driver pg devolveria texto).
const SELECT_PRODUTO = `
    SELECT p.id,
           p.nome,
           p.descricao,
           p.preco::float8 AS preco,
           p.estoque,
           p.imagem,
           c.id   AS categoria_id,
           c.nome AS categoria,
           m.arquivo AS modelo_3d
    FROM produto p
    JOIN categoria c ON c.id = p.categoria_id
    LEFT JOIN modelo_3d m ON m.produto_id = p.id
`;

// GET /api/produtos  → lista todos
router.get('/', async (req, res) => {
    const resultado = await pool.query(`${SELECT_PRODUTO} ORDER BY p.id`);
    res.json(resultado.rows);
});

// GET /api/produtos/:id  → um produto
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: 'ID inválido' });
    }

    // $1 é um parâmetro: o valor é enviado separado do SQL (evita SQL injection)
    const resultado = await pool.query(`${SELECT_PRODUTO} WHERE p.id = $1`, [id]);

    if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json(resultado.rows[0]);
});

export default router;