

const problemFormat = z.object({
    problem: z.string(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string()
    }))
})

const resultFormat = z.object({
    problem: z.string(),
    feedback: z.string(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string(),
        expected: z.string(),
        result: z.string()
    }))
})