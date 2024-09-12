const Biblioteca = require("../src/Trabalho01Turma02");

describe("Testes da classe Biblioteca", () => {
  let biblioteca = [];

  beforeEach(() => {
    biblioteca = new Biblioteca();
  });

  test("Teste de adicionar livro da biblioteca", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });

    expect(biblioteca.buscarLivroPorId(1)).toEqual({
      id: 1,
      titulo: "Mais esperto que o Diabo",
    });
  });

  test("Teste de remover livro da biblioteca", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.removerLivro(1);

    expect(biblioteca.listarLivros()).toEqual([
      {
        id: 2,
        titulo: "Harry Potter e Pedra Filosofal",
      },
    ]);
  });

  test("Teste de buscar livro por titulo da biblioteca", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });

    expect(biblioteca.buscarLivroPorTitulo("Mais esperto que o Diabo")).toEqual(
      [
        {
          id: 1,
          titulo: "Mais esperto que o Diabo",
        },
      ]
    );
  });

  test("Teste de listar livros da biblioteca", () => {
    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({ id: 3, titulo: "Pensa e Cresça" });

    expect(biblioteca.listarLivros()).toEqual([
      { id: 1, titulo: "Mais esperto que o Diabo" },
      {
        id: 2,
        titulo: "Harry Potter e Pedra Filosofal",
      },
      { id: 3, titulo: "Pensa e Cresça" },
    ]);
  });

  test("Teste de adicionar membro na biblioteca", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });

    expect(biblioteca.buscarMembroPorId(1)).toEqual({ id: 1, nome: "Thiago" });
  });

  test("Teste de remover membro da biblioteca", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.removerMembro(1);

    expect(biblioteca.listarMembros()).toEqual([{ id: 2, nome: "Leonardo" }]);
  });

  test("Teste de listar membros da biblioteca", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    expect(biblioteca.listarMembros()).toEqual([
      { id: 1, nome: "Thiago" },
      { id: 2, nome: "Leonardo" },
      { id: 3, nome: "Daniel" },
    ]);
  });

  test("Teste de emprestar livro que existe na biblioteca", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({ id: 3, titulo: "Pensa e Cresça" });

    expect(biblioteca.emprestarLivro(1, 3)).toEqual(true);
  });

  test("Teste de emprestar livro que não existe na biblioteca", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({ id: 3, titulo: "Pensa e Cresça" });

    expect(biblioteca.emprestarLivro(5, 2)).toEqual(false);
  });

  test("Teste de devolver livro emprestado", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({ id: 3, titulo: "Pensa e Cresça" });

    biblioteca.emprestarLivro(1, 3);

    expect(biblioteca.devolverLivro(1)).toEqual(true);
  });

  test("Teste de devolver livro que não está emprestado", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({ id: 3, titulo: "Pensa e Cresça" });

    biblioteca.emprestarLivro(1, 3);

    expect(biblioteca.devolverLivro(3)).toEqual(false);
  });

  test("Teste de listar livros emprestados", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    biblioteca.adicionarLivro({ id: 1, titulo: "Mais esperto que o Diabo" });
    biblioteca.adicionarLivro({
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({ id: 3, titulo: "Pensa e Cresça" });

    biblioteca.emprestarLivro(1, 3);
    biblioteca.emprestarLivro(2, 3);
    biblioteca.emprestarLivro(3, 2);

    expect(biblioteca.listarLivrosEmprestados()).toEqual([
      {
        emprestado: true,
        id: 1,
        idMembro: 3,
        titulo: "Mais esperto que o Diabo",
      },
      {
        emprestado: true,
        id: 2,
        idMembro: 3,
        titulo: "Harry Potter e Pedra Filosofal",
      },
      { emprestado: true, id: 3, idMembro: 2, titulo: "Pensa e Cresça" },
    ]);
  });

  test("Teste de listar livros disponíveis", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });

    biblioteca.adicionarLivro({
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 3,
      titulo: "Pensa e Cresça",
    });

    biblioteca.emprestarLivro(1, 3);
    biblioteca.emprestarLivro(2, 3);

    expect(biblioteca.listarLivrosDisponiveis()).toEqual([
      { emprestado: false, id: 3, titulo: "Pensa e Cresça" },
    ]);
  });

  test("Teste de quantidade livros cadastrados na biblioteca", () => {
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 3,
      titulo: "Pensa e Cresça",
    });

    expect(biblioteca.contarLivros()).toEqual(3);
  });

  test("Teste de quantidade de membros cadastrados na biblioteca", () => {
    biblioteca.adicionarMembro({ id: 1, nome: "Thiago" });
    biblioteca.adicionarMembro({ id: 2, nome: "Leonardo" });
    biblioteca.adicionarMembro({ id: 3, nome: "Daniel" });
    biblioteca.adicionarMembro({ id: 4, nome: "Diego" });

    expect(biblioteca.contarMembros()).toEqual(4);
  });

  test("Teste de listar livro por autor", () => {
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
      autor: "Napoleão Hill",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
      autor: "JK Rowling",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 3,
      titulo: "Pensa e Cresça",
      autor: "Napoleão Hill",
    });

    expect(biblioteca.listarLivrosPorAutor("JK Rowling")).toEqual([
      {
        autor: "JK Rowling",
        emprestado: false,
        id: 2,
        titulo: "Harry Potter e Pedra Filosofal",
      },
    ]);
  });

  test("Teste de listar livros por genêro", () => {
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
      autor: "Napoleão Hill",
      genero: "Desenvolvimento Pessoal",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
      autor: "JK Rowling",
      genero: "Realismo Mágico",
    });
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 3,
      titulo: "Pensa e Cresça",
      autor: "Napoleão Hill",
      genero: "Desenvolvimento Pessoal",
    });

    expect(biblioteca.listarLivrosPorGenero("Realismo Mágico")).toEqual([
      {
        autor: "JK Rowling",
        emprestado: false,
        genero: "Realismo Mágico",
        id: 2,
        titulo: "Harry Potter e Pedra Filosofal",
      },
    ]);
  });

  test("Teste de atualizar informação de um livro", () => {
    biblioteca.adicionarLivro({
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
      autor: "JK Rowling",
      genero: "Mágia",
    });

    biblioteca.atualizarInformacaoLivro(1, {
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
      autor: "Napoleão Hill",
      genero: "Mágia",
    });

    expect(biblioteca.buscarLivroPorId(1)).toEqual({
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
      autor: "Napoleão Hill",
      genero: "Mágia",
    });
  });

  test("Teste de listar livros por ano", () => {
    biblioteca.adicionarLivro({
      ano: 2020,
      emprestado: false,
      id: 1,
      titulo: "Mais esperto que o Diabo",
      autor: "Napoleão Hill",
      genero: "Desenvolvimento Pessoal",
    });
    biblioteca.adicionarLivro({
      ano: 2012,
      emprestado: false,
      id: 2,
      titulo: "Harry Potter e Pedra Filosofal",
      autor: "JK Rowling",
      genero: "Realismo Mágico",
    });
    biblioteca.adicionarLivro({
      ano: 2020,
      emprestado: false,
      id: 3,
      titulo: "Pensa e Cresça",
      autor: "Napoleão Hill",
      genero: "Desenvolvimento Pessoal",
    });

    expect(biblioteca.listarLivrosPorAno(2020)).toEqual([
      {
        ano: 2020,
        autor: "Napoleão Hill",
        emprestado: false,
        genero: "Desenvolvimento Pessoal",
        id: 1,
        titulo: "Mais esperto que o Diabo",
      },
      {
        ano: 2020,
        autor: "Napoleão Hill",
        emprestado: false,
        genero: "Desenvolvimento Pessoal",
        id: 3,
        titulo: "Pensa e Cresça",
      },
    ]);
  });
});
