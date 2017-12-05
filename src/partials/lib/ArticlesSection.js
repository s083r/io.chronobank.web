import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ArticleModel } from 'src/models'
import styles from './ArticlesSection.sass'

@connect(mapStateToProps)
export default class ArticlesSection extends React.Component {

  static propTypes = {
    articles: PropTypes.arrayOf(ArticleModel),
  }

  render () {
    const { articles } = this.props
    return (
      <div className='root articles-section'>
        <style jsx>{styles}</style>
        <div className='background'>
          <div className='background-left'></div>
          <div className='background-right'></div>
        </div>
        <div className='wrap'>
          <div className='content'>
            {articles.map(article => (
              <div className='item' key={article.id}>
                <div className='left'>
                  {!article.icon ? null : (
                    <div className='icon'>
                      <img alt={article.title} {...{
                        src: article.icon ? `${article.icon.url}` : undefined,
                        srcSet: article.icon2x ? `${article.icon2x.url} 2x` : undefined
                      }}/>
                    </div>
                  )}
                </div>
                <div className='right'>
                  <div className='text' dangerouslySetInnerHTML={{ __html: article.brief}}></div>
                  <a className='more' href={article.url}>
                    <img src='/static/images/symbols/more.svg' />
                    <span>Read the full article</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/*
          <div className='buttons'>
            <a className='button' href='#'>All articles about us</a>
          </div>
          */}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    articles: state.pages.articles.array,
  }
}
