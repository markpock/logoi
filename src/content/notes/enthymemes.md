---
title: Enthymemes.
description: "\"Hidden-premise\" judgments and how they can help us make sense of the analytic-synthetic distinction."
tags:
    - essay
    - logic
    - philosophy
    - analytic-philosophy
    - philosophy-of-language
date: 2026-05-25
---

## Enthymemes as a judgment form.
An enthymeme is a hidden-premise judgment. For example,
1. Socrates is a man. [Premise]
2. Therefore, Socrates is mortal. [Conclusion]

We reasoned to the conclusion from the hidden premise that all men are mortal. In practice, most of our judgments are enthymematic -- no one would find the argument above objectionable. As such, Aristotle took enthymemes to be the paradigm of rhetorical argument.[^AristotleProof]

[^AristotleProof]: Aristotle called this form of argument *proof*, as opposed to *demonstration* (which is what we today understand as rigorous proof).

What distinguishes a good enthymeme from a bad one? Intuitively, an enthymeme is made good when the hearer believes a hidden premise that would make the enthymeme valid. This gives rise to something like a *holism* -- the validity of (enthymematic) judgments depends not just on the logical entailment between the premises and the conclusion, but also the surrounding web of belief.

Accordingly, we might understand a valid enthymematic judgment $\Gamma \vdash_{E} \phi \; \textsf{true}$ in a context $B$ then as implicitly depending upon the validity of the judgment $B, \Gamma \vdash \phi \; \textsf{true}$. We might write an inference rule to capture this behavior, in which $B$ disappears as a premise:
$$
\dfrac{
    B, \Gamma \vdash \phi \; \textsf{true}
}{
    \therefore \Gamma \vdash_E \phi \; \textsf{true}
}
$$

But this analysis raises a key question -- what about the form of judgment itself? At least in Quine's web of belief, logic is part of the web, just like any other form of knowledge. That is, the validity of the judgment $B, \Gamma \vdash \phi$ is hardly independent of $B$, for $B$ sets up a criterion according to which we adjudge the validity of judgments. Indeed, in practice, we do often (at least in logic!) dispute what forms of judgment are valid.

For example, see how antirealists have championed substructural logics as logics which actually reflect the structure of good inference.[^AntirealismSubstructuralLogic] A substructural logic might require us to reject contraction, which allows us to use a premise more than once in an argument. That such a substructural logic is "the right logic" (i.e. the logic against which we should judge the validity of inferences) is an item of knowledge, a node in the web of belief. How can a body of knowledge bind itself -- set an immanent criterion for its own validity?
[^AntirealismSubstructuralLogic]: A stray example -- see Dubucs and Marion, [Radical anti-realism and substructural logics](https://shs.hal.science/halshs-00000055/file/krakow.pdf). We can also consider the work on substructural logic coming out of Pittsburgh.

## Martin-Löf on the analytic-synthetic distinction.
For now, I will sidestep this thorny question. Instead, I want to consider a different situation (and a different framework) where enthymematic judgment can help us solve a pesky problem.

The analytic/synthetic distinction sets up a contrast between judgments (or truths) made true by the meanings of the terms involved and judgments made true by other factors. In "Two Dogmas of Empiricism," Quine seemed to strike it dead for both natural and artificial languages. Yet the distinction remains intuitively compelling.

<!-- another framework in which enthymematic judgment does solve a pesky problem. Another way of glossing the *implicit dependence* of the enthymematic judgment on the logical judgment is to say that the enthymematic judgment *suppresses* the evidence of its validity. -->

Many years later, Per Martin-Löf attempted to present a viable account.[^MartinLofCitation] Martin-Löf suggests that we should view synthetic judgments as judgments which suppress an underlying analytic judgment. The underlying analytic judgment contains the evidence necessary to verify the synthetic judgment -- i.e. the analytic judgment *makes explicit* what is implicit in the synthetic judgment, just the same way that a deductively valid judgment makes explicit what is implicit in an enthymematic judgment.

The paradigmatic synthetic judgment (for Martin-Löf) is $\vdash \phi \; \textsf{true}$ -- that a certain proposition $\phi$ is true. Martin-Löf contrasts this with the alternative judgment $\vdash p : \phi$ -- that $p$ is a proof of $\phi$. The difference is computational -- $\vdash \phi \; \textsf{true}$ cannot be checked, but $\vdash p : \phi$ can. Thus, Martin-Löf understands analytic judgments as *decidable* judgments.[^AnalyticityAsDecidability] Just as before, we may write a similar inference rule which showcases this suppression of evidence.

[^MartinLofCitation]: See Per Martin-Löf's [Analytic and Synthetic Judgments in Type Theory](https://archive-pml.github.io/martin-lof/pdfs/Martin-Lof-Analytic-and-Synthetic-Judgements-in-Type-Theory.pdf).

[^AnalyticityAsDecidability]: At best a rather bad gloss -- Martin-Löf treats decidability as a crucial consequence of analyticity without bothering to rigorously define the notion of analyticity itself, which defeats the point of our current exercise. Martin-Löf instead merely says that on the conventional informal definition of analyticity, the judgment form $\Gamma \vdash t : T$ is an analytic judgment form. Others following in the Martin-Löf tradition have, however, considered this strict identification of the analytic with the decidable, so it is not so objectionable.

$$
\dfrac{
    \vdash p : \phi
}{
    \therefore \; \vdash \phi \; \textsf{true}
}
$$

I consider this a very satisfying answer to the question of finding a principled analytic/synthetic distinction in artificial languages. But it is worth noting that  -- in classic Martin-Löf fashion -- this approach locates the descriptors analytic and synthetic as applying to different objects from their conventional targets. Namely, this makes *judgment* (forms) analytic/synthetic and not *truths* (true propositions).

It seems that both Kant and later interpreters of Kant have used the terms "analytic judgment" and "analytic truth" or "analytic proposition" interchangeably -- though logical empiricists and later analytic philosophers tend to speak solely of analytic truths. And if the concept "analytic truth" is to capture the idea of a "truth of meaning", perhaps judgments are not the right place to put the notion of analyticity. 
For even if we consider truth to be a (privileged) *judgment* rather than a model-theoretic notion, we can still speak of "truths" simpliciter -- these are just the propositions $\phi$ such that we may judge $\phi \; \textsf{true}$. And the Martin-Löf distinction says nothing about these.

So Per Martin-Löf's analytic judgment (forms) as decidable families are very different beasts from the analytic truths of which Quine was skeptical.


<!-- [^3]: See Bruno Bentzen's [Analyticity and syntheticity in type theory revisited](https://philarchive.org/archive/BENAAS-9v1). -->


<!-- I'll return to this question momentarily. For now, let's consider another framework -- Martin Löf's formulation of the analytic-synthetic distinction. For Martin-Löf, a synthetic judgment *suppresses* the evidence of its verification. The paradigmatic synthetic judgment is $\vdash P \; \textsf{true}$, which is to be contrasted with $\vdash t : P$. -->
