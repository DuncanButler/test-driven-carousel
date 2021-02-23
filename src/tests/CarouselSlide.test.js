import React from 'react'
import { shallow, mount } from 'enzyme'
import CarouselSlide from '../CarouselSlide'

describe('CarouselSlide', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CarouselSlide
      imgUrl="https://example.com/default.jpg"
      description="Default test image"
    />
    )
  })
  it('redners a <figure>', () => {
    expect(wrapper.type()).toBe('figure')
  })

  it('renders an <img> and a <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img)
    expect(wrapper.childAt(1).type()).toBe('figcaption')
  })

  it('passes `imageUrl` through to the <img>', () => {
    const imgUrl = 'https://example.com/image.png'
    wrapper.setProps({ imgUrl })
    const img = wrapper.find(CarouselSlide.defaultProps.Img)
    expect(img.prop('src')).toBe(imgUrl)
  })

  it('uses `description` and `attribution` as the <figcaption>', () => {
    const description = 'A jaw-droppingly spactacular image'
    const attribution = 'Trevor Burnham'
    wrapper.setProps({ description, attribution })
    expect(wrapper.find('figcaption').text()).toBe(`${description} ${attribution}`)
  })

  it('presses other props through to the <figure>', () => {
    const style = {}
    const onClick = () => { }
    const className = 'my-carousel-slide'
    wrapper.setProps({ style, onClick, className })
    expect(wrapper.prop('style')).toBe(style)
    expect(wrapper.prop('onClick')).toBe(onClick)
    expect(wrapper.prop('className')).toBe(className)
  })
})

describe('Img', () => {
  let mounted
  const imgUrl = 'https://example.com/default.jpg'

  beforeEach(() => {
    const Img = CarouselSlide.defaultProps.Img
    mounted = mount(<Img src={imgUrl} imgHeight={500} />)
  })

  it('renders an <img> with the given src', () => {
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true)
  })

  it('has the expected static styles', () => {
    expect(mounted).toHaveStyleRule('width', '100%')
    expect(mounted).toHaveStyleRule('object-fit', 'cover')
  })

  it('uses imgHieght as the height style property', () => {
    expect(mounted).toHaveStyleRule('height', '500px')
    mounted.setProps({ imgHeight: 'calc(100vh - 100px)' })
    expect(mounted).toHaveStyleRule('height', 'calc(100vh - 100px)')
  })
})