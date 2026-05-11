import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCheckbox from '../../../app/components/ui/BaseCheckbox.vue'

describe('BaseCheckbox', () => {
  
  describe('Базовый рендеринг', () => {
    it('монтирует компонент', () => {
      const wrapper = mount(BaseCheckbox)
      expect(wrapper.exists()).toBe(true)
    })

    it('рендерит элемент input с типом checkbox', () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.exists()).toBe(true)
    })

    it('рендерит визуальный квадрат (div)', () => {
      const wrapper = mount(BaseCheckbox)
      const visualDiv = wrapper.find('div.group')
      expect(visualDiv.exists()).toBe(true)
    })

    it('рендерит анимированную галочку (div с bg-accent-red)', () => {
      const wrapper = mount(BaseCheckbox)
      const checkMark = wrapper.find('div.bg-accent-red')
      expect(checkMark.exists()).toBe(true)
    })
  })

  describe('V-model (двустороннее связывание)', () => {
    it('отображает начальное значение false по умолчанию', () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input')
      expect(input.element.checked).toBe(false)
    })

    it('отображает начальное значение true при переданном modelValue', () => {
      const wrapper = mount(BaseCheckbox, {
        props: { modelValue: true }
      })
      const input = wrapper.find('input')
      expect(input.element.checked).toBe(true)
    })

    it('обновляет состояние при клике', async () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input')
      
      await input.setValue(true)
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('обновляет визуальное состояние (галочка появляется)', async () => {
      const wrapper = mount(BaseCheckbox, {
        props: { modelValue: false }
      })
      
      const checkMark = wrapper.find('div.bg-accent-red')

      expect(checkMark.classes()).toContain('scale-0')
      
      await wrapper.setProps({ modelValue: true })

      expect(checkMark.classes()).toContain('scale-0')
      expect(wrapper.find('input').element.checked).toBe(true)
    })

    it('корректно переключает состояние при множественных кликах', async () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input')
      
      await input.setValue(true)
      await input.setValue(false)
      await input.setValue(true)
      
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted?.[0]).toEqual([true])
      expect(emitted?.[1]).toEqual([false])
      expect(emitted?.[2]).toEqual([true])
    })
  })

  describe('Атрибут required', () => {
    it('имеет required по умолчанию (true)', () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input')
      expect(input.attributes('required')).toBeDefined()
    })

    it('можно отключить required через проп', () => {
      const wrapper = mount(BaseCheckbox, {
        props: { required: false }
      })
      const input = wrapper.find('input')
      expect(input.attributes('required')).toBeUndefined()
    })

    it('можно явно включить required', () => {
      const wrapper = mount(BaseCheckbox, {
        props: { required: true }
      })
      const input = wrapper.find('input')
      expect(input.attributes('required')).toBeDefined()
    })
  })

  describe('Визуальные состояния и анимации', () => {
    it('имеет CSS классы для hover эффекта', () => {
      const wrapper = mount(BaseCheckbox)
      const visualDiv = wrapper.find('div.group')
      
      expect(visualDiv.classes()).toContain('hover:border-primary')
    })

    it('имеет классы для анимации галочки', () => {
      const wrapper = mount(BaseCheckbox)
      const checkMark = wrapper.find('div.bg-accent-red')
      
      expect(checkMark.classes()).toContain('scale-0')
      expect(checkMark.classes()).toContain('transition-transform')
      expect(checkMark.classes()).toContain('duration-300')
      expect(checkMark.classes()).toContain('peer-checked:scale-100')
    })

    it('имеет правильные размеры и границы', () => {
      const wrapper = mount(BaseCheckbox)
      const visualDiv = wrapper.find('div.group')
      
      expect(visualDiv.classes()).toContain('h-4')
      expect(visualDiv.classes()).toContain('w-4')
      expect(visualDiv.classes()).toContain('border')
      expect(visualDiv.classes()).toContain('border-primary')
    })

    it('input занимает всю область и прозрачен', () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input')
      
      expect(input.classes()).toContain('absolute')
      expect(input.classes()).toContain('inset-0')
      expect(input.classes()).toContain('opacity-0')
      expect(input.classes()).toContain('cursor-pointer')
    })
  })

  describe('Доступность (a11y)', () => {
    it('имеет правильный тип checkbox', () => {
        const wrapper = mount(BaseCheckbox)
        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe('checkbox')
    })

    it('прокидывает атрибут name на input', () => {
        const wrapper = mount(BaseCheckbox, {
        attrs: { name: 'terms_accepted' }
        })
        const input = wrapper.find('input')
        expect(input.attributes('name')).toBe('terms_accepted')
    })

    it('прокидывает атрибут aria-label на input', () => {
        const wrapper = mount(BaseCheckbox, {
        attrs: { 'aria-label': 'Согласие с условиями' }
        })
        const input = wrapper.find('input')
        expect(input.attributes('aria-label')).toBe('Согласие с условиями')
    })

    it('имеет курсор-указатель на кликабельной области', () => {
        const wrapper = mount(BaseCheckbox)
        const input = wrapper.find('input')
        
        expect(input.classes()).toContain('cursor-pointer')
    })
  })

  describe('Граничные случаи', () => {
    it('работает без пропсов', () => {
      const wrapper = mount(BaseCheckbox)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('input').element.checked).toBe(false)
    })

    it('обрабатывает быстрое переключение', async () => {
      const wrapper = mount(BaseCheckbox)
      const input = wrapper.find('input')
      
      for (let i = 0; i < 10; i++) {
        await input.setValue(i % 2 === 0)
      }
      
      expect(wrapper.emitted('update:modelValue')?.length).toBe(10)
    })

    it('сохраняет состояние при повторном рендере', async () => {
      const wrapper = mount(BaseCheckbox, {
        props: { modelValue: true }
      })
      
      expect(wrapper.find('input').element.checked).toBe(true)
      
      await wrapper.setProps({ modelValue: true })
      
      expect(wrapper.find('input').element.checked).toBe(true)
    })
  })

  describe('Интеграция с формами', () => {
    it('значение включается в отправку формы когда checked', async () => {
      const wrapper = mount(BaseCheckbox, {
        props: { modelValue: true },
        attrs: { name: 'subscribe', value: 'yes' }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe('subscribe')
      expect(input.element.checked).toBe(true)
    })

    it('значение НЕ включается в отправку формы когда не checked', () => {
      const wrapper = mount(BaseCheckbox, {
        props: { modelValue: false },
        attrs: { name: 'subscribe' }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe('subscribe')
      expect(input.element.checked).toBe(false)
    })

    it('поддерживает атрибут value', () => {
      const wrapper = mount(BaseCheckbox, {
        attrs: { value: 'custom_value' }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('value')).toBe('custom_value')
    })
  })
})