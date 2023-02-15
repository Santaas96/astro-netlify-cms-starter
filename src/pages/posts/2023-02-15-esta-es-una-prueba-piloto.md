---
title: Esta es una prueba piloto
description: Use Netlify’s “Git Gateway” authentication and target our default branch
heroImage: https://images3.alphacoders.com/813/813087.jpg
author: Santiaguito pa
authorURL: https://github.com/Santaas96/astro-netlify-cms-starter
publishDate: 15 Feb 2023
layout: ../../layouts/BlogPost.astro
---
> *"Soy el mejor" ,* Cortes Santiago
>
> ```javascript
> ---
> import Author from './Author.astro';
>
> export interface Props {
> 	title: string;
> 	author: string;
> 	authorURL: string;
> 	publishDate: string;
> 	heroImage: string;
> 	description:string;
> }
>
> const { title, author, authorURL, publishDate, heroImage, description } = Astro.props as Props;
> ---
>
> <div class="layout">
> 	<article class="content">
> 		<div>
> 			<header>
> 				<h1 class="title">{title}</h1>
> 				<h3>{description}</h3>
> 				<img width="720" height="420" class="hero-image" loading="lazy" src={heroImage} />
> 				<p class="publish-date">{publishDate}</p>
> 				<Author name={author} href={authorURL} />
> 			</header>
> 			<main>
> 				<slot />
> 			</main>
> 		</div>
> 	</article>
> </div>
> ```