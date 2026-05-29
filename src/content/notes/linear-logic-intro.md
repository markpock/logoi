---
title: A gloss of linear logic.
description: Baby (by which I mean me)'s first linear logic.
tags:
    - exposition
    - logic
date: 2026-05-28
---
After many years of skirting around the details and being vaguely aware of the generalities, I've finally buckled down and started learning a tiny bit about linear logic. Here's a first gloss of linear logic in a blog post, which may hopefully be helpful to people in a similar situation -- people who know how classical logic and basic set theory work and who know how to program. In particular, I've always wondered what par does, and I finally think I have a true (if deflationary) answer. Throughout the post, I’ll write = loosely for the relevant type/logical equivalence or isomorphism.

---
<!-- ## Introduction.
Classical logic -- we know it (and hopefully love it). It is a formal system for manipulating the relationships between static, eternal truths -- paradigmatically, mathematical truths.

Linear logic is about resources. A proposition in linear logic does not represent a static, eternal truth; it represents a truth which is true-at-the-moment. For example, if I am hungry, I might eat food. If I eat food, I will no longer be hungry.

There is nothing suspicious about this. But what happens if we model this as a classical implication?

1. $\textsf{I am hungry} \longrightarrow \textsf{I eat food}$
2. $\textsf{I eat food} \longrightarrow \textsf{I am not hungry}$
3. Therefore, $\textsf{I am hungry} \longrightarrow \textsf{I am not hungry}$.

Well, this is patently an abuse of (classical) logic. These translations are utterly wrongheaded. We could correct them by quantifying over times -- "if I am hungry at some time $t$, I will eat food at some time $t' > t$." That's a live option. But that suffers from another problem. Suppose that some food is on the table (at time $t$). Is the food still there at time $t'$? Obviously. But we could not infer that with only the premises
1. if I am hungry at some time $t$, I will eat food at some time $t' > t$,
2. if I eat food at some time $t$, I will no longer be hungry at time $t$,
3. there is food on the table at time $t$.

Granted, there are states of affairs we wouldn't like to just keep around from timestep to timestep -- for example, "I am happy at time $t$. And for such states of affairs, maybe a logic of time is the right job (indeed, temporal logic works sort of like this, though it is simpler in order to enable computation). -->
## Classical times and plus.
$A \times B$ -- Cartesian product, the set of all pairs of As and Bs -- is very well known. Perhaps less well-known is $A + B$ -- disjoint union, all As and all Bs unioned in such a way that we can tell which set the elements came from (relevant if one takes the disjoint union of a set with itself).

We should note that, as the symbols suggest, $\times$ functions like multiplication and $+$ functions like addition. There is an obvious sense in which this is true -- $|A \times B| = |A| \times |B|$ (and likewise for $+$) -- but if anything, this should be treated as a definition of $\times$ and $+$ on cardinals, not a deep truth.

But what I mean by this is different. How can we tell multiplication and addition apart in a structure where both exist?[^1] It is because one distributes over the other -- because $A \times (B + C) = A \times B + A \times C$ (and likewise for right-distributivity). And this is indeed true of Cartesian product and disjoint union. (A pair of an A and (either a B or a C)) is (either (a pair of an A and a B) or (a pair of an A and a C)).
[^1]: A semiring.

So far, so good -- this is fairly intuitive. We can up the ante by noting that we can also consider the arguments of $\times$ and $+$ as types and as propositions. As a type, $A \times B$ means exactly the same thing as the set $A \times B$ (likewise for $+$). The Curry-Howard correspondence tells us how to interpret types as propositions -- think of the elements of a type as proofs of a proposition. Then, having a pair of a proof of A and a proof of B is the same as having a proof of $A \land B$; having either a proof of A or a proof of B is the same as having a proof of $A \lor B$.

## Computation and resources.
We will now move away from the world of sets and into the world of types -- hence, into the world of computation. We are going to take an odd view of values. Values are resources -- they are things that can be *consumed*. For a little bit of motivation -- think of any value that needs to be cleaned up: a file handle, a socket, even heap memory itself.

We are going to introduce a primitive that represents a consumer of a value -- something that cleans it up. By the end of our program, every value needs to be cleaned up. I will notate the type of these primitives as $A^\bot$. If these primitives are values, then they must also get their own consumers -- that is, we must have a type $A^{\bot^\bot}$. How do we clean up an $A^\bot$?

We could imagine allowing many ways, but we will be conservative and say that the only way to consume a consumer is to use the consumer on the thing it consumes. That is, the only way to clean up an $A^\bot$ is to provide it with an $A$. So, a consumer of $A^\bot$ -- an $A^{\bot^\bot}$ -- is just an $A$.

## Consuming times and plus.
To denote this change in perspective, we will relabel $\times$ to $\otimes$ and $+$ to $\oplus$.

What does it mean to consume an $A \otimes B$? Leaning on the idea that $\cdot^\bot$ is a cleanup function, what we have is a function in two parameters which cleans up both parameters. The function is entitled to use the two parameters whatever way it pleases before it cleans them up.

Note that this is not the same as possessing two separate cleanup functions which can clean up $A$ and clean up $B$ independently. Suppose, for example, that $A$ and $B$ were two sides of a connection -- the cleanup function would need to use $A$ and $B$ together in order to consume them both.

What does it mean to consume an $A \oplus B$? This time, two separate cleanup functions would do the trick -- but recall that the cleanup functions themselves are values which need to be consumed. We'd only be able to use up one of the cleanup functions for whichever variant of the $A \oplus B$ was actually present -- but the other would be left dangling.

Unsurprisingly, these two constructs have names -- $⅋$ and $\&$ respectively. That is, an $A^\bot ⅋ B^\bot$ is the sort of thing that can consume an $A$ and a $B$ together (thus an $A ⅋ B$ is the sort of thing that can consume an $A^\bot$ and a $B^\bot$ together). Similarly, an $A^\bot \& B^\bot$ is the sort of thing that can consume either an $A$ or a $B$ -- is a state of preparedness for either an $A$ or a $B$.

A practical example is in order. Let's imagine several different kinds of vending machines (a popular example).
1. Suppose we are at a vending machine with Sprite and Coke. I can select one of them without doing anything to the other. This is $\otimes$.
2. Suppose we are at a vending machine with a sticker that says "mystery drink -- get a Sprite or a Coke," but there is only one drink in the machine -- I can press the button, and it will come out, leaving no drinks left. This is $\oplus$.
3. Suppose we are at a vending machine that has some milk and espresso to make coffee. I can order either a cappuccino or a latte, and they use the same ingredients. Therefore, once I order one, I can no longer order the other. This is $\&$.
4. ...$⅋$ is quite difficult to explain this way.

## Functions.
$⅋$ is made easier to digest by instituting another notation in its place -- call $A^\bot ⅋ B = A \multimap B$. $\multimap$ means "transforms into", and is our notiation for function types. Stretching notation again and pretending we have a value $\bot$ s.t. $A ⅋ \bot = A$, we can interpret $A^\bot$ as $A \multimap \bot$, and thus $A ⅋ B$ as $(A \multimap \bot) \multimap (B \multimap \bot) \multimap \bot$.

It is now easily evident why we cannot factor $⅋$ into two independent functions joined by $\otimes$. At least in this semantics for linear logic -- the conventional resource-driven semantics -- this is what $⅋$ means: $⅋$ means dependent consumption of two consumers, and therefore dependent production of two resources.[^2]

[^2]: From the perspective of propositions, $⅋$ is simultaneous refutation of refutations.

## Some classification.
Because $\oplus$ and $\otimes$ act like addition and multiplication, they are respectively called the additive or and multiplicative and. Because of the stipulations we put on $\cdot^\bot$ -- namely that it be involutive -- and the construction of $⅋$ and $\&$ -- by duality under involution -- we get distributivity in the same manner for these for free (but here is a proof):
$$
\begin{align*}
A ⅋ (B \& C)
&= (A^\bot \otimes ((B^\bot \oplus C^\bot)^\bot)^\bot)^\bot \\
&= (A^\bot \otimes (B^\bot \oplus C^\bot))^\bot \\
&= ((A^\bot \otimes B^\bot) \oplus (A^\bot \otimes C^\bot))^\bot \\
&= (((A^\bot \otimes B^\bot)^\bot)^\bot \oplus ((A^\bot \otimes C^\bot)^\bot)^\bot)^\bot \\
&= A ⅋ B \& A ⅋ C
\end{align*}
$$
Therefore, we likewise call $⅋$ multiplicative and $\&$ additive. It is perhaps clear that both have or-like and and-like properties, but as they are respectively dual to their ands and ors, $⅋$ is multiplicative or and $\&$ additive and.

Finally, $\oplus$ and $\otimes$ are positive connectives while $⅋$ and $\&$ are negative (for other reasons involving a crucial aspect of linear logic not covered here, its sequent calculus).[^3]

[^3]: In that sense, this can barely be said to be a presentation of linear logic -- it's more like "linear type theory for the working programmer."
