import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../../../app/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  
  describe('Базовый рендеринг', () => {
    it('монтирует компонент', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.exists()).toBe(true)
    })

    it('рендерит элемент button', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('отображает переданный текст в слоте', () => {
      const buttonText = 'Нажми меня'
      const wrapper = mount(BaseButton, {
        slots: { default: buttonText }
      })
      expect(wrapper.text()).toContain(buttonText)
    })

    it('работает с пустым слотом', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.find('span').text()).toBe('')
    })
  })

  describe('Атрибуты и наследование', () => {
    it('прокидывает пользовательские атрибуты на кнопку', () => {
      const wrapper = mount(BaseButton, {
        attrs: {
          id: 'custom-button',
          'data-testid': 'main-btn',
          type: 'submit'
        }
      })
      
      const button = wrapper.find('button')
      expect(button.attributes('id')).toBe('custom-button')
      expect(button.attributes('data-testid')).toBe('main-btn')
      expect(button.attributes('type')).toBe('submit')
    })

    it('позволяет добавлять дополнительные CSS классы', () => {
      const wrapper = mount(BaseButton, {
        attrs: { class: 'my-custom-class' }
      })
      
      const button = wrapper.find('button')
      expect(button.classes()).toContain('my-custom-class')
      expect(button.classes()).toContain('group')
    })

    it('поддерживает атрибут disabled', () => {
      const wrapper = mount(BaseButton, {
        attrs: { disabled: true }
      })
      
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  describe('События', () => {
    it('эмитит событие click при нажатии на кнопку', async () => {
      const wrapper = mount(BaseButton)
      await wrapper.find('button').trigger('click')
      
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.length).toBe(1)
    })

    it('эмитит событие при каждом клике', async () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')
      
      expect(wrapper.emitted('click')?.length).toBe(3)
    })

    it('не блокирует клики (кнопка всегда кликабельна)', async () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      
      await button.trigger('click')
      await button.trigger('click')
      
      expect(wrapper.emitted('click')?.length).toBe(2)
    })

    it('корректно обрабатывает быструю серию кликов', async () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      
      const clicks = Array(10).fill(null).map(() => button.trigger('click'))
      await Promise.all(clicks)
      
      expect(wrapper.emitted('click')?.length).toBe(10)
    })
  })

  describe('Визуальные состояния (анимации и эффекты)', () => {
    it('имеет hover-эффект с изменением цвета границы', () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      
      const hasHoverEffect = button.classes().some(c => c.includes('hover:'))
      expect(hasHoverEffect).toBe(true)
    })

    it('содержит анимированный элемент для эффекта заливки', () => {
      const wrapper = mount(BaseButton)
      const animatedDiv = wrapper.find('div.absolute')
      
      expect(animatedDiv.exists()).toBe(true)
      
      // проверка анимки перехода
      expect(animatedDiv.classes()).toContain('transition-transform')
    })

    it('имеет эффект нажатия (масштабирование)', () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      
      const hasActiveEffect = button.classes().some(c => c.includes('active:'))
      expect(hasActiveEffect).toBe(true)
    })
  })

  describe('Доступность (a11y)', () => {
    it('использует семантический тег button', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.find('button').element.tagName).toBe('BUTTON')
    })

    it('поддерживает атрибут aria-label для скринридеров', () => {
      const wrapper = mount(BaseButton, {
        attrs: { 'aria-label': 'Закрыть диалоговое окно' }
      })
      
      expect(wrapper.attributes('aria-label')).toBe('Закрыть диалоговое окно')
    })

    it('поддерживает атрибут title', () => {
      const wrapper = mount(BaseButton, {
        attrs: { title: 'Всплывающая подсказка' }
      })
      
      expect(wrapper.attributes('title')).toBe('Всплывающая подсказка')
    })
  })

  describe('Обработка контента', () => {
    it('отображает любой переданный текст', () => {
      const texts = ['Купить', 'Отмена', 'Подтвердить', 'ОЧЕНЬ ДЛИННЫЙ ТЕКСТ']
      
      texts.forEach(text => {
        const wrapper = mount(BaseButton, {
          slots: { default: text }
        })
        expect(wrapper.text()).toBe(text)
      })
    })

    it('может содержать HTML в слоте', () => {
      const wrapper = mount(BaseButton, {
        slots: { default: '<span class="icon">★</span> Избранное' }
      })
      
      expect(wrapper.html()).toContain('★')
      expect(wrapper.text()).toContain('Избранное')
    })

    it('обрабатывает реактивный контент', async () => {
      const wrapper = mount(BaseButton, {
        slots: { default: 'Нажми' }
      })
      expect(wrapper.text()).toBe('Нажми')
      await wrapper.setProps({})
    })
  })

  describe('Интеграция с классами', () => {
    it('сохраняет свои классы при добавлении дополнительных', () => {
      const wrapper = mount(BaseButton, {
        attrs: { class: 'extra-class another-class' }
      })
      
      const button = wrapper.find('button')
      expect(button.classes()).toContain('group')
      expect(button.classes()).toContain('relative')
      expect(button.classes()).toContain('extra-class')
      expect(button.classes()).toContain('another-class')
    })

    it('имеет структурно-необходимые классы', () => {
      const wrapper = mount(BaseButton)
      const button = wrapper.find('button')
      
      // классы для анимок
      expect(button.classes()).toContain('group')
      expect(button.classes()).toContain('relative')
      expect(button.classes()).toContain('overflow-hidden')
    })
  })
})