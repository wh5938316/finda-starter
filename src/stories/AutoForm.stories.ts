import type { RJSFSchema } from '@rjsf/utils';
import type { Meta, StoryObj } from '@storybook/react';

import AutoForm from '../components/form/Form';
import type { MyUiSchema } from '../components/form/types';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/AutoForm',
  component: AutoForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof AutoForm<FormData>>;

export default meta;
type Story = StoryObj<typeof meta>;

const schema: RJSFSchema = {
  type: 'object',
  required: ['basicInfo', 'education'],
  properties: {
    basicInfo: {
      type: 'object',
      required: ['name', 'age', 'gender'],
      title: '基本信息',
      description: '请填写您的基本个人信息',
      properties: {
        name: {
          type: 'string',
          title: '姓名',
          minLength: 2,
          maxLength: 20,
          description: '请输入真实姓名',
        },
        age: {
          type: 'number',
          title: '年龄',
          minimum: 0,
          maximum: 150,
        },
        gender: {
          type: 'string',
          title: '性别',
          enum: ['male', 'female', 'other'],
          oneOf: [
            { const: 'male', title: '男' },
            { const: 'female', title: '女' },
            { const: 'other', title: '其他' },
          ],
        },
        newsletter: {
          type: 'boolean',
          title: '订阅新闻',
          description: '是否接收我们的新闻通讯',
        },
        notification: {
          type: 'boolean',
          title: '通知设置',
          description: '是否开启系统通知',
        },
      },
    },
    education: {
      type: 'object',
      title: '教育经历',
      required: ['degrees'],
      properties: {
        degrees: {
          type: 'array',
          title: '学位信息',
          minItems: 1,
          description: '请按照时间顺序添加您的学位信息',
          items: {
            type: 'object',
            required: ['schoolName', 'period', 'degree', 'major'],
            properties: {
              schoolName: {
                type: 'string',
                title: '学校名称',
              },
              period: {
                type: 'object',
                title: '就读时间',
                required: ['start', 'end'],
                properties: {
                  start: {
                    type: 'string',
                    title: '开始时间',
                    format: 'date',
                  },
                  end: {
                    type: 'string',
                    title: '结束时间',
                    format: 'date',
                  },
                },
              },
              degree: {
                type: 'string',
                title: '学位',
                enum: ['bachelor', 'master', 'phd', 'other'],
                oneOf: [
                  { const: 'bachelor', title: '学士' },
                  { const: 'master', title: '硕士' },
                  { const: 'phd', title: '博士' },
                  { const: 'other', title: '其他' },
                ],
              },
              major: {
                type: 'string',
                title: '专业',
              },
              gpa: {
                type: 'number',
                title: 'GPA',
                minimum: 0,
                maximum: 4,
              },
            },
          },
        },
      },
    },
    workExperience: {
      type: 'array',
      title: '工作经历',
      items: {
        type: 'object',
        required: ['company', 'department', 'position', 'period'],
        properties: {
          company: {
            type: 'object',
            title: '公司信息',
            required: ['name', 'industry'],
            properties: {
              name: {
                type: 'string',
                title: '公司名称',
              },
              industry: {
                type: 'string',
                title: '所属行业',
              },
              scale: {
                type: 'object',
                title: '公司规模',
                properties: {
                  employeeCount: {
                    type: 'number',
                    title: '员工人数',
                  },
                  type: {
                    type: 'string',
                    title: '规模类型',
                    enum: ['small', 'medium', 'large'],
                    oneOf: [
                      { const: 'small', title: '小型(≤100人)' },
                      { const: 'medium', title: '中型(100-500人)' },
                      { const: 'large', title: '大型(>500人)' },
                    ],
                  },
                },
              },
            },
          },
          department: {
            type: 'object',
            title: '部门信息',
            properties: {
              name: {
                type: 'string',
                title: '部门名称',
              },
              level: {
                type: 'string',
                title: '部门层级',
                enum: ['1', '2', '3', '4', '5'],
                oneOf: [
                  { const: '1', title: '一级部门' },
                  { const: '2', title: '二级部门' },
                  { const: '3', title: '三级部门' },
                  { const: '4', title: '四级部门' },
                  { const: '5', title: '五级部门' },
                ],
              },
            },
          },
          position: {
            type: 'object',
            title: '职位信息',
            required: ['title', 'level'],
            properties: {
              title: {
                type: 'string',
                title: '职位名称',
              },
              level: {
                type: 'string',
                title: '职级',
                enum: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
                oneOf: [
                  { const: 'p1', title: 'P1' },
                  { const: 'p2', title: 'P2' },
                  { const: 'p3', title: 'P3' },
                  { const: 'p4', title: 'P4' },
                  { const: 'p5', title: 'P5' },
                  { const: 'p6', title: 'P6' },
                  { const: 'p7', title: 'P7' },
                  { const: 'p8', title: 'P8' },
                ],
              },
              responsibilities: {
                type: 'array',
                title: '工作职责',
                items: {
                  type: 'string',
                },
              },
            },
          },
          period: {
            type: 'array',
            title: '任职时间',
            minItems: 1,
            items: {
              type: 'object',
              required: ['start'],
              properties: {
                start: {
                  type: 'string',
                  title: '开始时间',
                  format: 'date',
                },
                end: {
                  type: 'string',
                  title: '结束时间',
                  format: 'date',
                },
                isCurrent: {
                  type: 'boolean',
                  title: '是否在职',
                },
              },
            },
          },
        },
      },
    },
  },
};

const uiSchema: MyUiSchema<
  any,
  RJSFSchema,
  any,
  {
    basicInfo: {
      name: string;
      age: number;
      gender: 'male' | 'female' | 'other';
      newsletter?: boolean;
      notification?: boolean;
    };
    education: {
      degrees: {
        items: {
          period: {
            start: string;
          };
          schoolName: string;
          degree: 'bachelor' | 'master' | 'phd' | 'other';
          major: string;
          gpa?: number;
        };
      };
    };
    contacts: {
      items: {
        type: string;
      };
    };
    workExperience: {
      items: {
        period: {
          start: string;
        };
        company: {
          name: string;
        };
        department: {
          name: string;
        };
        position: {
          title: string;
        };
      };
    };
  }
> = {
  basicInfo: {
    'ui:order': ['name', 'age', 'gender', 'newsletter', 'notification'],
    'ui:help': '所有带 * 号的字段都必须填写',
    name: {
      'ui:placeholder': '请输入姓名',
      'ui:help': '长度在2-20个字符之间',
    },
    age: {
      'ui:placeholder': '请输入年龄',
      'ui:help': '年龄必须在0-150之间',
    },
    gender: {
      'ui:widget': 'radio',
      'ui:placeholder': '请选择性别',
      'ui:help': '请选择您的性别',
    },
    newsletter: {
      'ui:widget': 'checkbox',
    },
    notification: {
      'ui:widget': 'switch',
    },
  },
  education: {
    degrees: {
      'ui:options': {
        orderable: true,
        addable: true,
        removable: true,
      },
      items: {
        'ui:order': ['schoolName', 'period', 'degree', 'major', 'gpa'],
        period: {
          start: {
            'ui:widget': 'date-picker',
            'ui:placeholder': '请选择开始时间',
          },
          end: {
            'ui:widget': 'date-picker',
            'ui:placeholder': '请选择结束时间',
          },
        },
        degree: {
          'ui:widget': 'select',
          'ui:placeholder': '请选择学位',
        },
        major: {
          'ui:placeholder': '请输入专业名称',
        },
        gpa: {
          'ui:placeholder': '请输入GPA（可选）',
        },
      },
    },
  },
  workExperience: {
    'ui:options': {
      orderable: true,
      addable: true,
      removable: true,
    },
    items: {
      'ui:order': ['company', 'department', 'position', 'period'],
      company: {
        'ui:help': '请填写完整的公司信息',
      },
      position: {
        responsibilities: {
          'ui:widget': 'textarea',
        },
      },
      period: {
        'ui:options': {
          orderable: true,
          addable: true,
          removable: true,
        },
        items: {
          start: {
            'ui:widget': 'date-picker',
            'ui:placeholder': '请选择开始时间',
          },
          end: {
            'ui:widget': 'date-picker',
            'ui:placeholder': '请选择结束时间',
          },
          isCurrent: {
            'ui:widget': 'switch',
          },
        },
      },
    },
  },
};

// 定义表单数据的接口
interface FormData {
  basicInfo: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    newsletter?: boolean;
    notification?: boolean;
  };
  education: {
    degrees: Array<{
      schoolName: string;
      period: {
        start: string;
        end: string;
      };
      degree: 'bachelor' | 'master' | 'phd' | 'other';
      major: string;
      gpa?: number;
    }>;
  };
  workExperience?: Array<{
    company: {
      name: string;
      industry: string;
      scale?: {
        employeeCount?: number;
        type?: 'small' | 'medium' | 'large';
      };
    };
    department: {
      name: string;
      level?: '1' | '2' | '3' | '4' | '5';
    };
    position: {
      title: string;
      level: 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8';
      responsibilities?: string[];
    };
    period: Array<{
      start: string;
      end?: string;
      isCurrent?: boolean;
    }>;
  }>;
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    schema,
    uiSchema: uiSchema as RJSFSchema,
    onSubmit: ((data: FormData) => {
      console.info(data);
    }) as unknown as (data: object) => void,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Secondary: Story = {
  args: {
    schema,
    uiSchema: uiSchema as RJSFSchema,
    onSubmit: ((data: FormData) => {
      console.info(data);
    }) as unknown as (data: object) => void,
  },
};

// 在文件末尾添加新的 story
export const WithCheckbox: Story = {
  args: {
    schema: {
      type: 'object',
      required: ['preferences'],
      properties: {
        preferences: {
          type: 'object',
          title: '个人偏好设置',
          properties: {
            interests: {
              type: 'array',
              title: '兴趣爱好',
              items: {
                type: 'string',
                enum: ['reading', 'sports', 'music', 'travel', 'cooking'],
                oneOf: [
                  { const: 'reading', title: '阅读' },
                  { const: 'sports', title: '运动' },
                  { const: 'music', title: '音乐' },
                  { const: 'travel', title: '旅行' },
                  { const: 'cooking', title: '烹饪' },
                ],
              },
              uniqueItems: true,
            },
            notifications: {
              type: 'object',
              title: '通知设置',
              properties: {
                email: {
                  type: 'boolean',
                  title: '邮件通知',
                  description: '接收重要更新的邮件通知',
                },
                sms: {
                  type: 'boolean',
                  title: '短信通知',
                  description: '接收重要更新的短信通知',
                },
                push: {
                  type: 'boolean',
                  title: '推送通知',
                  description: '接收应用内推送通知',
                },
              },
            },
          },
        },
      },
    },
    uiSchema: {
      preferences: {
        interests: {
          'ui:widget': 'checkboxes',
          'ui:options': {
            inline: true,
          },
        },
        notifications: {
          email: {
            'ui:widget': 'checkbox',
          },
          sms: {
            'ui:widget': 'checkbox',
          },
          push: {
            'ui:widget': 'checkbox',
          },
        },
      },
    } as RJSFSchema,
    onSubmit: ((data: FormData) => {
      console.info(data);
    }) as unknown as (data: object) => void,
  },
};
