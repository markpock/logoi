---
title: The meaning explanations.
description: My notes on Jonathan Sterling's paper on the meaning explanations, by way of a general paraphrase of the ideas.
tags:
    - reading
    - logic
date: 2026-06-05

---

I've spent a little while in Lean and Rocq now and have become a little too used to the formalistic fiat of inductive definitions. I was actually drafting up a blog post about how I wasn't sure about the division between proposition and judgment anymore (and there might be good reasons to doubt, but the reasons I had in mind were not so) when I came across [a paper by Jonathan Sterling](https://arxiv.org/pdf/1512.01837) describing the meaning explanations which flipped my mistaken prejudices on its head. In what follows, I will attempt to sketch out some of the ideas in the paper -- consider this an attempt to paraphrase.

---

Verificationism is, for most philosophers, a long-dead spectre, if occasionally a helpful mine for inspiration. In particular, verificationism about meaning goes something like this --
> $\textsf{The verification principle.}$ The only meaningful statements are the statements which can be verified, and the meaning of a statement is its means of verification.

But for the proof-theoretic semantics tradition, this goal is a live area of work, and has been made precise. For the moment, let us take a means of verification to be the same as a *proof* -- prima facie, this is certainly how we would verify a formal statement.

Now, here is a rather droll statement, familiar to anyone who has used Lean or Rocq. A proof of $P \rightarrow Q$ is a lambda-term $\lambda x : P. E$ where $x : P \vdash E : Q$. Therefore, prima facie, on the verification principle, the meaning of an implication $P \rightarrow Q$ is the set of lambda-terms $\lambda x : P. E$ where $x : P \vdash E : Q$.

In general, the meaning of a proposition (type) depends on typed terms. As a tool for building proofs, this is all well and good. But taken as an explanation of meaning, as a formal gloss of the verification principle, this is deeply puzzling -- if we are trying to understand the meaning of types in general, why are we allowed to presuppose the notion of type?[^OriginalPaper]


## The meaning explanations.

So we should revise our initial idea -- there is a meaningful sense in which a verification needs to be autonomous from the framework of potential truthbearers which verifications actually verify. Rather, we impose some sort of order of explanation -- the truthbearers are explained by the verifications.

A natural candidate for this anterior substrate of verifications is an untyped lambda calculus. To see how we might go about this, let us investigate what we are actually saying in claiming that a proof of $P \rightarrow Q$ is a lambda-term $\lambda x : P. E$ where $x : P \vdash E : Q$. We are saying that a proof of $P \rightarrow Q$ transforms a proof of $P$ into a proof of $Q$. And what is unique about this setup is that we have embedded its being such a transformer into its structure -- $P$ is part of the term itself. This is the central complication we are trying to dispel.

But it is perfectly fine for us, in an untyped setting, merely to stipulate that a verification of $P \rightarrow Q$ transforms a verification of $P$ into a verification of $Q$. Instead of baking this into the structure, we can just predicate this property of our untyped stratum. What do I mean by this? Suppose that we consider the relation $x \in T$ to mean $x$ verifies $T$. Then, we consider $\lambda x. E \in P \rightarrow Q$ when $\forall p \in P, E[x := p] \in Q$.

Is this all we can say? What about $(\lambda x. x) (\lambda x. E)$ where $\forall p \in P, E[x := p] \in Q$? Should we not also take this to be a verification of $P \rightarrow Q$, albeit an indirect one? If this is so, it is not immediately justified by its structure.

What we need is to add the additional conception of evaluation to the system to relate the two terms appropriately -- since  $(\lambda x. x) (\lambda x. E) \Downarrow (\lambda x. E)$ (evaluates to), because  $(\lambda x. E)$ is a (direct) verification of $P \rightarrow Q$,  $(\lambda x. x) (\lambda x. E)$ is an (indirect) verification of $P \rightarrow Q$.

Hence, in general, we say that when $T \Downarrow T'$ and $T'$ is a direct verification of a proposition $P$, $T$ is an indirect verification of $P$.

## Two kinds of theories.

The sort of type theory I have just described is a *computational* theory, because the meanings of the judgments are given by recourse to computation; hence the theory has a natural, immediate computational interpretation.[^Priority] We are used to considering the Lean-Rocq style of theory (which is rather a proof-oriented theory) as also having a natural computational interpretation, but this computational interpretation is by no means baked into the underlying meaning of the judgments.

[^Priority]: In fact, from the perspective of proof rather than programming, it seems a bit unnatural, prima facie, to force a reduction system on what seems perfectly fine on its own as a proof system. Rather, I should say -- in proof, it is canonicality that comes first: we are interested in the idea of a simplest proof, and whatever system that gets us there is interesting as a means to an end. In programming, it is reduction that comes first: we are interested in the idea of computation (in the immanent dynamics of the expression, even), and if there happens to be a canonical form at the end of the tunnel, so much the better for our computability regime (if not, at least our language is Turing-complete).

Hence, in the computational theory, whether a certain expression has a certain type is an open question which, in full generality, we can only solve by evaluating the expression (which may not terminate!). In the proof-oriented theory, whether a certain expression has a certain type is immediate from the structure of the expression.[^AnalyticSynthetic]

[^AnalyticSynthetic]: Another way of framing this issue -- from the perspective of the computational theory, $\Gamma \vdash x : \tau$ is synthetic, from the perspective of the proof-oriented theory, it is analytic. I actually found this paper on the meaning explanations by way of Bruno Bentzen's paper on [analyticity and syntheticity in type theory](https://philpapers.org/rec/BENAAS-9), having come out very confused by his claim that $\Gamma \vdash x : \tau$ was synthetic (in virtue of the meaning explanations). I will probably make another post about this soon now that I understand the meaning explanations a bit better.

Similarly, in the computational theory, whether two expressions are definitionally equal is an open question which we can only solve by reducing the expressions, whereas in the proof-oriented theory, we take a very dim view of definitional equality so as to make deciding definitional equality immediate from the structure of the expressions.[^IntensionalityExtensionality]

[^IntensionalityExtensionality]: While it is not necessary for this to be the case, computational theories are often extensional -- that is, the judgmental equality of the theory is very strong. This usually happens because, as in the original Martin-Löf type theory, there is an explicit reflection rule that turns propositional equality into judgmental equality. However, in the variant presented by Sterling, this is because the judgmental equality reflects the semantic equality directly. Both methods make the judgmental equality undecidable -- but because the typing judgment is already undecidable apart from the undecidability of the judgmental equality, this does not matter. However, in proof-oriented systems, the typing judgment is meant to be decidable, our judgmental equality must also be decidable -- hence, we usually want our judgmental equality to be intensional, a weak structural equality that we can decide.

As a consequence, in the computational theory, that an expression has a certain type is something that one must prove in the metalogic, and one thus works in the metalogic rather than in the object logic -- one manipulates the judgments directly. In the proof-oriented theory, the metalogic is so simple that there is no need to manipulate the judgments directly -- the kernel will do it for the user, and the user is free to program in the object logic.

## What now?

So, what does this mean for philosophy? The proof-oriented theory promises a purely structural notion of type. It is agnostic about which semantics you choose; it is meaningfully syntactic. This is perhaps a blessing if we are prepared to consider semantics separately and merely wish to get useful work done, but this of course sheds no light on critical semantic notions we may be interested in.

Namely, we learn nothing about analyticity and syntheticity, nothing about synonymy, and so on. The computational theory is a genuine semantic proposal -- in fact, we may well take it as a semantics on which our proof-oriented theory could rest (giving the semantics of expressions by type erasure). It has substantive answers about which judgments are analytic and which are synthetic -- but they may not be the answers we want, and they are certainly not the answers Martin-Löf originally had in mind: more on this in a future post.
