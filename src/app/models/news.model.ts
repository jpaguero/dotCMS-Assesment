interface blogContent {
  content: [
    {
      type: string, 
      content: [
        {
          text: string,
          content: [
            {
              type: string,
              text: string
            }
          ]
        }
      ]
    }
  ]
}

export interface New {
  id: '',
  title: string;
  image: string;
  publishDate: string;
  blogContent?: blogContent;
}

export const newDefault: New = {
  id: '',
  title: '',
  image: '',
  publishDate: ''
}