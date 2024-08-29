const Banco = require("../src/banco");

describe("Testes da classe Banco", () => {
  let conta;
  let conta2;

  beforeEach(() => {
    conta = new Banco("Conta Teste", 50);
    conta2 = new Banco("Conta Teste2", 100);
  });

  test("Teste de depósito", () => {
    expect(conta.depositar(50)).toStrictEqual(100);
  });

  test("Teste de saque", () => {
    expect(conta.sacar(20)).toStrictEqual(30);
  });

  test("Teste de saque com valor maior do que possui na conta", () => {
    expect(() => conta.sacar(70)).toThrow(new Error("Saldo insuficiente"));
  });

  test("Teste de transferência entre contas", () => {
    conta.transferir(20, conta2);
    expect(conta2.obterSaldo()).toStrictEqual(120);
  });

  test("Teste de obter saldo da conta", () => {
    expect(conta.obterSaldo()).toStrictEqual(50);
  });

  test("Teste de obter histórico de transações", () => {
    conta.depositar(50);
    conta.transferir(30, conta2);
    expect(conta.obterHistorico()).toEqual([
      { tipo: "Depósito", valor: 50 },
      { tipo: "Saque", valor: 30 },
      { tipo: "Transferência", valor: 30, destino: "Conta Teste2" },
    ]);
  });

  test("Teste de definir limite de saque para dar erro", () => {
    conta.definirLimiteDeSaque(100);
    expect(() => conta.verificarLimiteDeSaque(200)).toThrow(
      new Error("Saque acima do limite permitido")
    );
  });

  test("Teste de definir limite de saque", () => {
    conta.definirLimiteDeSaque(100);
    expect(conta.verificarLimiteDeSaque(100)).toBeTruthy();
  });

  test("Teste de aplicar juros", () => {
    expect(conta.aplicarJuros(5)).toStrictEqual(52.5);
  });

  test("Teste de pagar conta", () => {
    expect(conta.pagarConta(50, "Conta de energia")).toStrictEqual(0);
  });

  test("Teste de obter total depositado", () => {
    conta.depositar(50);
    conta.depositar(30);
    conta.depositar(100);
    expect(conta.obterTotalDepositado()).toStrictEqual(180);
  });
});
