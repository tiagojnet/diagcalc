function calculate() {
  const tp = parseInt(document.getElementById("tp").value);
  const fp = parseInt(document.getElementById("fp").value);
  const tn = parseInt(document.getElementById("tn").value);
  const fn = parseInt(document.getElementById("fn").value);
  const preTestProb =
    parseFloat(document.getElementById("preTestProb").value) / 100;

  const sensitivity = tp / (tp + fn);
  const specificity = tn / (tn + fp);
  const ppv = tp / (tp + fp);
  const npv = tn / (tn + fn);
  const lrPositive = sensitivity / (1 - specificity);
  const lrNegative = (1 - sensitivity) / specificity;

  // Convert pre-test probability to odds
  const preTestOdds = preTestProb / (1 - preTestProb);

  // Calculate post-test odds
  const postTestOddsPositive = preTestOdds * lrPositive;
  const postTestOddsNegative = preTestOdds * lrNegative;

  // Convert post-test odds to probability
  const postTestProbPositive =
    postTestOddsPositive / (1 + postTestOddsPositive);
  const postTestProbNegative =
    postTestOddsNegative / (1 + postTestOddsNegative);

  // Function to calculate 95% Confidence Interval
  function calcCI(p, n) {
    const z = 1.96; // 95% CI
    const numerator = z * Math.sqrt((p * (1 - p)) / n);
    return [p - numerator, p + numerator];
  }

  const sensitivityCI = calcCI(sensitivity, tp + fn);
  const specificityCI = calcCI(specificity, tn + fp);
  const ppvCI = calcCI(ppv, tp + fp);
  const npvCI = calcCI(npv, tn + fn);

  document.getElementById("Resultados").innerHTML = `Resultados`;
  document.getElementById("sensitivity").innerHTML =
    `Sensibilidade: <code>${(sensitivity * 100).toFixed(0)}% (IC 95%: ${(sensitivityCI[0] * 100).toFixed(1)}% - ${(sensitivityCI[1] * 100).toFixed(1)}%)</code>`;
  document.getElementById("specificity").innerHTML =
    `Especificidade: ${(specificity * 100).toFixed(1)}% (IC 95%: ${(specificityCI[0] * 100).toFixed(1)}% - ${(specificityCI[1] * 100).toFixed(1)}%)`;
  document.getElementById("ppv").innerHTML =
    `VPP: ${(ppv * 100).toFixed(1)}% (IC 95%: ${(ppvCI[0] * 100).toFixed(1)}% - ${(ppvCI[1] * 100).toFixed(1)}%)`;
  document.getElementById("npv").innerHTML =
    `VPN: ${(npv * 100).toFixed(1)}% (IC 95%: ${(npvCI[0] * 100).toFixed(1)}% - ${(npvCI[1] * 100).toFixed(1)}%)`;
  document.getElementById("lrPositive").innerHTML =
    `LR+: ${lrPositive.toFixed(1)}`;
  document.getElementById("lrNegative").innerHTML =
    `LR-: ${lrNegative.toFixed(2)}`;
  document.getElementById("postTestProbPositive").innerHTML =
    `Probabilidade Pós-Teste (Resultado Positivo): ${(postTestProbPositive * 100).toFixed(1)}%`;
  document.getElementById("postTestProbNegative").innerHTML =
    `Probabilidade Pós-Teste (Resultado Negativo): ${(postTestProbNegative * 100).toFixed(1)}%`;
}
