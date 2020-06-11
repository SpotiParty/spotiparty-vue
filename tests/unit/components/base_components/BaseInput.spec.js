import BaseInput from '@/components/base_components/BaseInput.vue'
import { shallowMount } from '@vue/test-utils'

describe('Component', () => {
   test('is a Vue instance', () => {
      const wrapper = shallowMount(BaseInput)
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})

describe('BaseIcon', () => {
   test('has correct default props', () => {
      const wrapper = shallowMount(BaseInput)
      expect(wrapper.props('height')).toBe(56)
      expect(wrapper.props('width')).toBe(200)
      expect(wrapper.props('type')).toBe('text')
      expect(wrapper.props('placeholder')).toBe('Placeholder')
      expect(wrapper.props('value')).toBe('')
      expect(wrapper.props('error')).toBe(false)
   })
   test('set props correctly', () => {
      const wrapper = shallowMount(BaseInput, {
         propsData: {
            height: 100,
            width: 100,
            type: 'type',
            placeholder: 'text',
            value: 'val',
            error: true
         }
      })
      expect(wrapper.props('height')).toBe(100)
      expect(wrapper.props('width')).toBe(100)
      expect(wrapper.props('type')).toBe('type')
      expect(wrapper.props('placeholder')).toBe('text')
      expect(wrapper.props('value')).toBe('val')
      expect(wrapper.props('error')).toBe(true)
   })
   test('renders props correctly', async () => {
      const wrapper = shallowMount(BaseInput, {
         propsData: {
            type: 'type',
            placeholder: 'text',
            value: 'val'
         }
      })
      const input = wrapper.find('input')
      expect(input.element.value).toBe('val')
      expect(input.attributes().type).toBe('type')
      expect(input.attributes().placeholder).toBe('text')
   })
   test("emit event 'focusin'", async () => {
      const wrapper = shallowMount(BaseInput)
      const input = wrapper.find('input')
      await input.trigger('focusin')
      expect(wrapper.emitted().focusin).toBeTruthy()
   })
})
