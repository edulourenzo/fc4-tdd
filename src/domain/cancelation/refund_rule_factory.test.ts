import { RefundRuleFactory } from "./refund_rule_factory";
import { FullRefund } from "./full_refund";
import { PartialRefund } from "./partial_refund";
import { NoRefund } from "./no_refund copy"; // Ajuste o caminho conforme o nome real do arquivo no seu projeto

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const daysUntilCheckIn = 8;
    const rule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);

    expect(rule).toBeInstanceOf(FullRefund);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    // Limite superior (7 dias)
    expect(RefundRuleFactory.getRefundRule(7)).toBeInstanceOf(PartialRefund);

    // Valor intermediário (4 dias)
    expect(RefundRuleFactory.getRefundRule(4)).toBeInstanceOf(PartialRefund);

    // Limite inferior (1 dia)
    expect(RefundRuleFactory.getRefundRule(1)).toBeInstanceOf(PartialRefund);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    // Exatamente 0 dias (no dia do check-in)
    expect(RefundRuleFactory.getRefundRule(0)).toBeInstanceOf(NoRefund);

    // Menos de 1 dia (ex: 0.5 dias)
    expect(RefundRuleFactory.getRefundRule(0.5)).toBeInstanceOf(NoRefund);
  });
});