import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from "../../../redux/blogsFeatures/blogsApi";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  coverImg: Yup.string().url("Invalid URL").required("Cover image URL is required"),
  metaDescription: Yup.string().required("Meta description is required"),
  category: Yup.string().required("Category is required"),
  rating: Yup.number().min(0, "Rating must be between 0 and 5").max(5, "Rating must be between 0 and 5").required("Rating is required")
});

function UpdatePost() {
  const { id } = useParams();
  const editorRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { data: blogData = {}, error, isLoading, refetch } = useFetchBlogByIdQuery(id);
  
  const blog = blogData?.post || {};

  const [updateBlog] = useUpdateBlogMutation();
  
  const navigate = useNavigate();

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
      },
      data: blog.content || {} // Load the content into the editor
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, [blog.content]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const outputData = await editorRef.current?.save();
      console.log('Editor Output Data:', outputData);
    
      const updatedPost = {
        title: values.title,
        description: values.metaDescription,
        content: {
          time: new Date().getTime(),
          blocks: outputData.blocks,
          version: outputData.version
        },
        coverImg: values.coverImg,
        category: values.category,
        author: {
          _id: user._id,
          email: user.email
        },
        rating: values.rating,
        createdAt: blog.createdAt,
      };
    
      console.log('Updated Post Data:', updatedPost);
    
      await updateBlog({ id, ...updatedPost }).unwrap();
      alert('Blog post updated successfully!')
      toast.success('Blog post updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating the post:', error);
      toast.error('Failed to update the blog post.');
    } finally {
      setSubmitting(false);
    }
  };
  
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <Formik
        enableReinitialize
        initialValues={{
          title: blog.title || '',
          coverImg: blog.coverImg || '',
          metaDescription: blog.description || '',
          category: blog.category || '',
          rating: blog.rating || 0
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Title */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Blog Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Edit your story"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="title" component="div" className="text-red-600" />
            </div>

            {/* Cover Image */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <Field
                type="text"
                name="coverImg"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="coverImg" component="div" className="text-red-600" />
            </div>

            {/* Meta Description */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <Field as="textarea"
                name="metaDescription"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Edit the description of your blog post"
              />
              <ErrorMessage name="metaDescription" component="div" className="text-red-600" />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Category</label>
              <Field as="select"
                name="category"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Books">Books</option>
                <option value="Work">Work</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Coding">Coding</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-600" />
            </div>

            {/* Rating */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
              <Field
                type="number"
                name="rating"
                min="0"
                max="5"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="rating" component="div" className="text-red-600" />
            </div>

            {/* Content */}
            <div className="form-group">
              <p className="text-sm font-medium mb-1">Content</p>
              <div id="editorjs" className="border border-gray-300 rounded p-2"></div>
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 hover:bg-blue-400"
              >
                Update blog
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  )
}

export default UpdatePost;
