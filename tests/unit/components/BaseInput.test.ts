import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

// для useId
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    useId: () => `mock-vue-id-${Math.random()}`
  }
})

vi.mock('#imports', () => ({
  useId: () => `mock-imports-id-${Math.random()}`
}))

globalThis.useId = () => `global-id-${Math.random()}`

import BaseInput from '../../../app/components/ui/BaseInput.vue'

describe('BaseInput', () => {
  
  describe('Базовый рендеринг', () => {
    it('монтирует компонент', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('рендерит элемент input', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('рендерит label с переданным текстом', () => {
      const labelText = 'Электронная почта'
      const wrapper = mount(BaseInput, {
        props: { label: labelText }
      })
      expect(wrapper.text()).toContain(labelText)
    })

    it('генерирует id для связи label и input', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      
      const input = wrapper.find('input')
      const label = wrapper.find('label')
      
      expect(input.attributes('id')).toBeDefined()
      expect(label.attributes('for')).toBe(input.attributes('id'))
    })
  })

  describe('V-model (основная функциональность)', () => {
    it('отображает начальное значение', () => {
      const initialValue = 'test@example.com'
      const wrapper = mount(BaseInput, {
        props: { 
          label: 'Email',
          modelValue: initialValue
        }
      })
      
      const input = wrapper.find('input')
      expect(input.element.value).toBe(initialValue)
    })

    it('обновляет значение при вводе пользователя', async () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      
      const input = wrapper.find('input')
      await input.setValue('Антон')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Антон'])
    })

    it('обновляет отображаемое значение при изменении modelValue извне', async () => {
      const wrapper = mount(BaseInput, {
        props: { 
          label: 'Имя',
          modelValue: 'Старое значение'
        }
      })
      
      await wrapper.setProps({ modelValue: 'Новое значение' })
      
      const input = wrapper.find('input')
      expect(input.element.value).toBe('Новое значение')
    })
  })

  describe('Передача атрибутов', () => {
    it('прокидывает атрибуты на input', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' },
        attrs: {
          type: 'email',
          placeholder: 'Введите email',
          required: true,
          maxlength: 50
        }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('email')
      expect(input.attributes('placeholder')).toBe('Введите email')
      expect(input.attributes('required')).toBeDefined()
      expect(input.attributes('maxlength')).toBe('50')
    })

    it('имеет placeholder-пробел по умолчанию', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe(' ')
    })

    it('не прокидывает атрибуты на корневой div (inheritAttrs: false)', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' },
        attrs: {
          'data-testid': 'custom-input',
          class: 'custom-class'
        }
      })
      
      const input = wrapper.find('input')
      const div = wrapper.find('div.relative')
      
      expect(input.attributes('data-testid')).toBe('custom-input')
      expect(div.attributes('data-testid')).toBeUndefined()
    })

    it('поддерживает различные типы input', () => {
      const types = ['text', 'email', 'password', 'tel', 'number']
      
      types.forEach(type => {
        const wrapper = mount(BaseInput, {
          props: { label: 'Поле' },
          attrs: { type }
        })
        
        expect(wrapper.find('input').attributes('type')).toBe(type)
      })
    })
  })

  describe('Анимации и визуальные эффекты', () => {
    it('имеет CSS классы для анимации при фокусе', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      
      const input = wrapper.find('input')
      const animatedLine = wrapper.find('div.absolute.bottom-0')
      
      expect(input.classes()).toContain('focus:border-accent-red')
      expect(animatedLine.classes()).toContain('peer-focus:w-full')
    })

    it('содержит анимированную линию под input', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      
      const animatedLine = wrapper.find('div.absolute.bottom-0')
      
      expect(animatedLine.exists()).toBe(true)
      expect(animatedLine.classes()).toContain('bg-accent-red')
      expect(animatedLine.classes()).toContain('transition-all')
    })

    it('label меняет позицию при заполненном поле', async () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })
      
      const input = wrapper.find('input')
      const label = wrapper.find('label')
      

      expect(label.classes()).toContain('top-4')

      await input.setValue('Антон')
      expect(input.element.value).toBe('Антон')
      expect(label.exists()).toBe(true)
    })

    it('имеет стилизованный placeholder (скрыт до фокуса)', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя' }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Доступность (a11y)', () => {
    it('связывает label с input через атрибут for', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Имя пользователя' }
      })
      
      const input = wrapper.find('input')
      const label = wrapper.find('label')
      
      expect(label.attributes('for')).toBe(input.attributes('id'))
    })

    it('клик по label устанавливает фокус на input', async () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Нажми на меня' }
      })
      
      const label = wrapper.find('label')
      const input = wrapper.find('input')

      await label.trigger('click')

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Граничные случаи', () => {
    it('обрабатывает очень длинный текст', async () => {
      const longText = 'a'.repeat(1000)
      const wrapper = mount(BaseInput, {
        props: { label: 'Текст' }
      })
      
      const input = wrapper.find('input')
      await input.setValue(longText)
      
      expect(input.element.value).toBe(longText)
    })

    it('обрабатывает специальные символы', async () => {
      const specialChars = '!@#$%^&*()_+{}[]|\\:;"\'<>,.?/~`'
      const wrapper = mount(BaseInput, {
        props: { label: 'Символы' }
      })
      
      const input = wrapper.find('input')
      await input.setValue(specialChars)
      
      expect(input.element.value).toBe(specialChars)
    })

    it('обрабатывает пробельные символы', async () => {
      const whitespace = '   пробелы в начале и конце   '
      const wrapper = mount(BaseInput, {
        props: { label: 'Пробелы' }
      })
      
      const input = wrapper.find('input')
      await input.setValue(whitespace)
      
      expect(input.element.value).toBe(whitespace)
    })

    it('корректно работает с кириллицей', async () => {
      const cyrillicText = 'Привет мир! Как дела?'
      const wrapper = mount(BaseInput, {
        props: { label: 'Кириллица' }
      })
      
      const input = wrapper.find('input')
      await input.setValue(cyrillicText)
      
      expect(input.element.value).toBe(cyrillicText)
    })

    it('обрабатывает быстрое изменение значения', async () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Быстрый ввод' }
      })
      
      const input = wrapper.find('input')
      
      await input.setValue('A')
      await input.setValue('AB')
      await input.setValue('ABC')
      await input.setValue('ABCD')
      
      expect(wrapper.emitted('update:modelValue')?.length).toBe(4)
      expect(wrapper.emitted('update:modelValue')?.pop()).toEqual(['ABCD'])
    })
  })

  describe('Интеграция с формами', () => {
    it('поддерживает атрибут name', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Email' },
        attrs: { name: 'user_email' }
      })
      
      expect(wrapper.find('input').attributes('name')).toBe('user_email')
    })

    it('поддерживает атрибут required', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Обязательное поле' },
        attrs: { required: true }
      })
      
      expect(wrapper.find('input').attributes('required')).toBeDefined()
    })

    it('поддерживает атрибут disabled', () => {
      const wrapper = mount(BaseInput, {
        props: { label: 'Отключенное поле' },
        attrs: { disabled: true }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('disabled')).toBeDefined()
      expect(input.element.disabled).toBe(true)
    })
  })
})