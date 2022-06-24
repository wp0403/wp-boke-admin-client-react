import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 设置高亮样式
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './style.less';

const RanderMarkdown = (props: any) => {
  const alertImg = (src: any) => {
    const imgBox = document.createElement('div');
    imgBox.className = 'layoutImgBox';
    imgBox.innerHTML = `<div class="layoutImgBox_content">
      <img src=${src} />
    </div>`;

    imgBox.onclick = () => {
      imgBox.remove();
    };

    document.body.appendChild(imgBox);
  };

  return (
    <Fragment>
      <ReactMarkdown
        children={props.markdown}
        className="markdown_body"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={coy}
                language={match[1]}
                showLineNumbers
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, alt }) {
            return <img onClick={() => alertImg(src)} src={src} alt={alt} />;
          },
          a({ href, children }) {
            return (
              <a href={href} target="_blank">
                {children}
              </a>
            );
          },
        }}
      />
    </Fragment>
  );
};

export default RanderMarkdown;
