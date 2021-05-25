const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = Lab.script()

exports.lab = lab

function payloadParser (payload) {
// fill seemed to create references rather than values. Look into alternative options of how can be done better.
  const result = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
  console.log({ result })
  for (const frameScore in payload) {
    const x = frameScore.split('_')
    const frameNumber = parseInt((x[1])) - 1
    const ballNumber = parseInt((x[3])) - 1
    const value = parseInt(payload[frameScore])
    const z = result[frameNumber]
    z[ballNumber] = value
    result[frameNumber] = z
  }

  return result
}

lab.experiment('payload parser test', () => {
  lab.test('simple payload parses correctly', async () => {
    const payload = {
      frame_1_ball_1: '1',
      frame_1_ball_2: '1',
      frame_2_ball_1: '1',
      frame_2_ball_2: '1',
      frame_3_ball_1: '1',
      frame_3_ball_2: '1',
      frame_4_ball_1: '2',
      frame_4_ball_2: '2',
      frame_5_ball_1: '1',
      frame_5_ball_2: '1',
      frame_6_ball_1: '1',
      frame_6_ball_2: '1',
      frame_7_ball_1: '1',
      frame_7_ball_2: '1',
      frame_8_ball_1: '1',
      frame_8_ball_2: '1',
      frame_9_ball_1: '1',
      frame_9_ball_2: '1',
      frame_10_ball_1: '1',
      frame_10_ball_2: '1'
    }
    const result = payloadParser(payload)

    Code.expect(result).to.equal([[1, 1], [1, 1], [1, 1], [2, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]])
  })
})
