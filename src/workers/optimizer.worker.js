import computeMunkres from 'munkres-js'

self.onmessage = ({ data: { companies, students, rankings } }) => {
  const assignments = computeMunkres(rankings).map(([row, column]) => ({
    student: students[row],
    company: companies[column],
    ranking: rankings[row][column],
  }))
  const total = assignments.reduce((sum, assignment) => sum + assignment.ranking, 0)
  self.postMessage({ assignments, avgSatisfaction: total / students.length })
}
