import { groq } from 'next-sanity'

// Create fragments for the common query patterns
export const linkFragment = groq`
  _type,
  "link": slug.current
`

export const externalLinkFragment = groq`
  openInNewTab,
  showPdfPageLeaveAlert,
  "link": externalLink,
  externalLink->{...}
`

export const wysiwygPageLinkFragment = groq`
  ...,
  externalLink->{
...,
    ${externalLinkFragment}
  },
  link->{
    ${linkFragment}
  }
`

export const buttonLinkGroupFragment = groq`
  ...,
  links[]{
    ...,
    link->{
      ${linkFragment}
    },
    externalLink->{
...,
      ${externalLinkFragment}
    }
  }
`

export const markDefsFragment = groq`
  markDefs[]{
    ...,
    _type == "wysiwygPageLink" => {
      ${wysiwygPageLinkFragment}
    }
  }
`

// Main wysiwyg fragment
export const wysiwygFragment = groq`
  ...,
  content[]{
    ...,
    _type == "buttonLinkGroup" => {
      ${buttonLinkGroupFragment}
    },
    ${markDefsFragment}
  }
`

export const wysiwygFragmentDescription = groq`
  ...,
  description[]{
    ...,
    _type == "buttonLinkGroup" => {
      ${buttonLinkGroupFragment}
    },
    ${markDefsFragment}
  }
`

export const modulesFragment = groq`
  "modules": modules[]->{
    ...,
    _type == "wysiwyg" => {
      ...,
    ${wysiwygFragment}
},
    _type == "ctaText" => {
      ...,
      description[]{
        ...,
      ${markDefsFragment},
      },
      ctas[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
        externalLink->{
...,
          _id,
          _type,
          externalLink,
        }
      }
    },
    _type == "getInspired" => {
      ...,
      cta{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      },
      topic->{
        _id,
        title,
        "slug": slug.current,
        "relatedPosts": *[_type == 'post' && references(^._id)] | order(date desc)[0...5]{
      ...,
          // Add any other fields you need from the post
        }
      },
      "featuredArticle": featuredArticle->{
        ...,
      },
      "articleGrid": articleGrid[]->{
        ...,
      }
    },
    _type == "ctaTopicRow" => {
      ...,
      description[]{
        ...,
        ${markDefsFragment}
      },
      links[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{

            ...,
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "ctaCardGridHome" => {
      ...,
      linkList[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current,
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "ctaCardGrid" => {
      ...,
      cards[]{
        ...,
        cardLink{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current,
            externalLink
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      }
    },
    _type == "ctaFullMedia" => {
      ...,
      cta{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,...,
            _id,
            _type, 
            externalLink,
          }
      },
      lowerContent{
        ...,
       ${wysiwygFragmentDescription} 
      }
    },
    _type == "ctaInContent" => {
      ...,
      ctaCard{
        ...,
        description[]{
          ...,
          ${markDefsFragment}
        },
        cta{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      }
    },
      _type == "textCardGrid" => {
      ...,
      cards[]{
        ...,
        pageLink{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      }
    },
    _type == 'relatedStories' => {
      ...,
      useTopic,
      posts[]->{
        ...,
      },
      topic->{
        _id,
        title,
        "slug": slug.current,
        "relatedPosts": *[_type == 'post' && references(^._id)] | order(date desc)[0...3]{
      ...,
          // Add any other fields you need from the post
        }
      },
      pageLink{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "accordion" => {
      ...,
      description[]{
        ...,
        ${markDefsFragment}
      },
      accordionItems[]{
        ...,
        title[]{
          ...,
          ${markDefsFragment}
        },
        content[]{
          ...,
            _type == "buttonLinkGroup" => {
      ${buttonLinkGroupFragment}
    },
    ${markDefsFragment}
              }
      }
    },
    _type == "columnSplit" => {
      ...,
      description[]{
        ...,
        ${markDefsFragment}
      },
      columns[]{
        ...,
        ${wysiwygFragment}
        }
      },
    _type == 'globalAlert'  => {
        ...,
        content[]{
          ...,
          ${markDefsFragment}
        }
    },
    _type == 'siteAlert'  => {
        ...,
        content[]{
          ...,
          ${markDefsFragment}
        }
    },
    _type == "imageGrid" => {
      ...,
      ${wysiwygFragmentDescription}
    },
    _type == "tabs" => {
      ...,
      description[]{
        ...,
        ${markDefsFragment}
      },
      tabs[]{
        ...,
        title[]{
          ...,
          ${markDefsFragment}
        },
        ${wysiwygFragment}
      }
    },
    _type == "rateTable" => {
      ...,
      columns[]{
        ...,
        columnTitle[]{
          ...,
          ${markDefsFragment}
        },
        columnValues[]{
          ...,
          value[]{
            ...,
            ${markDefsFragment}
          }
        }
      },
      tableNotes[]{
        ...,
      _type == "buttonLinkGroup" => {
        ${buttonLinkGroupFragment}
      },
      ${markDefsFragment}
    }
  }
  }
`

export const ratesModulesFragment = groq`
  "modules": modules[]->{
    ...,
  }
`

export const homepageModulesFragment = groq`
  "homepageModules": homepageModules[]->{
    ...,
    _type == "wysiwyg" => {
      ...,
    ${wysiwygFragment}
},
    _type == "ctaText" => {
      ...,
      description[]{
        ...,
      ${markDefsFragment},
      },
      ctas[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
        externalLink->{
...,
          _id,
          _type,
          externalLink,
        }
      }
    },
    _type == "getInspired" => {
      ...,
      cta{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      },
      topic->{
        _id,
        title,
        "slug": slug.current,
        "relatedPosts": *[_type == 'post' && references(^._id)] | order(date desc)[0...5]{
      ...,
          // Add any other fields you need from the post
        }
      },
      "featuredArticle": featuredArticle->{
        ...,
      },
      "articleGrid": articleGrid[]->{
        ...,
      }
    },
    _type == "ctaTopicRow" => {
      ...,
      description[]{
        ...,
        ${markDefsFragment}
      },
      links[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,
          ...,
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "ctaCardGridHome" => {
      ...,
      cards[]{
        ...,
        cardLink{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current,
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      },
      linkList[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current,
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "ctaCardGrid" => {
      ...,
      cards[]{
        ...,
        cardLink{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current,
            externalLink
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      }
    },
    _type == "ctaFullMedia" => {
      ...,
      cta{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      },
      lowerContent{
        ...,
       ${wysiwygFragmentDescription} 
      }
    },
    _type == "ctaInContent" => {
      ...,
      ctaCard{
        ...,
        description[]{
          ...,
          ${markDefsFragment}
        },
        cta{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      }
    },
      _type == "textCardGrid" => {
      ...,
      cards[]{
        ...,
        pageLink{
          ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current
          },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
        }
      }
    },
    _type == 'relatedStories' => {
      ...,
      useTopic,
      posts[]->{
        ...,
      },
      topic->{
        _id,
        title,
        "slug": slug.current,
        "relatedPosts": *[_type == 'post' && references(^._id)] | order(date desc)[0...3]{
      ...,
          // Add any other fields you need from the post
        }
      },
      pageLink{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
          externalLink->{
...,
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "accordion" => {
      ...,
      description[]{
        ...,
        ${markDefsFragment}
      },
      accordionItems[]{
        ...,
        title[]{
          ...,
          ${markDefsFragment}
        },
        content[]{
          ...,
          ${markDefsFragment}
        }
      }
    },
    _type == 'globalAlert'  => {
        ...,
        content[]{
          ...,
          ${markDefsFragment}
        }
    },
    _type == 'siteAlert'  => {
        ...,
        content[]{
          ...,
          ${markDefsFragment}
        }
    }
  }
`
