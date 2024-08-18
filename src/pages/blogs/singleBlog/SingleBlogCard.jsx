import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import formatDate from '../../../utilis/formateDate';
import EditorJSHTML from 'editorjs-html'

const editorJSHTML = EditorJSHTML()

function SingleBlogCard({ blog }) {
  const { title, description, content, author, coverImg, rating, category,createdAt } = blog || {};

  const htmlContent =  editorJSHTML.parse(content).join('')

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Cover Image */}
     
      
      {/* Blog Title and Category */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        {category && (
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
            {category}
          </span>
        )}
            
      </div>
      <p>{formatDate(createdAt)} by <span className='text-blue-400 font-bold'>Admin</span></p>

      {coverImg && (
        <img
          src={coverImg}
          alt={title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}

      {/* Blog Rating */}
    

      {/* Blog Description */}
      {description && (
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{description}</p>
      )}

      {/* Blog Content */}

<div>
  <div dangerouslySetInnerHTML={{__html: htmlContent}} className='space-y-3 editorjsDiv' />
  {rating && (
        <div className="flex items-center mb-6">
          <AiFillStar className="text-yellow-400 mr-2" />
          <span className="text-gray-600">{rating} / 5</span>
        </div>
      )}
</div>



      {/* {content?.blocks?.length > 0 && (
        <div className="content text-gray-700">
          {content.blocks.map((block) => {
            switch (block.type) {
              case 'header':
                return (
                  <h2 key={block.id} className="text-2xl font-semibold mb-4">
                    {block.data.text}
                  </h2>
                );
              case 'paragraph':
                return (
                  <p key={block.id} className="text-lg leading-relaxed mb-4">
                    {block.data.text}
                  </p>
                );
              case 'list':
                return (
                  <ul key={block.id} className="list-disc list-inside mb-4 pl-4">
                    {block.data.items.map((item, index) => (
                      <li key={index} className="text-lg leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>
      )} */}

      {/* Author Information */}
      {author && (
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-500">Written by: <span className="text-gray-700">{author.email}</span></p>
        </div>
      )}
    </div>
  );
}

export default SingleBlogCard;
