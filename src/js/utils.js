import moment from 'moment';

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("es-ES", {
    timeZone: "UTC",
  });
}

export function formatBlogPosts(
  posts,
  {
    // filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { publishDate } = post.frontmatter;

    if (filterOutFuturePosts && new Date(publishDate) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => {
      if (
        moment(b.frontmatter.publishDate).isBefore(a.frontmatter.publishDate)
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
