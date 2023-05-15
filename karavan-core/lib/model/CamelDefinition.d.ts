import { CamelElement } from "./IntegrationDefinition";
export declare class ProcessorDefinition extends CamelElement {
    stepName?: string;
    aggregate?: AggregateDefinition;
    bean?: BeanDefinition | string;
    doCatch?: CatchDefinition;
    choice?: ChoiceDefinition;
    circuitBreaker?: CircuitBreakerDefinition;
    claimCheck?: ClaimCheckDefinition;
    convertBodyTo?: ConvertBodyDefinition | string;
    delay?: DelayDefinition;
    dynamicRouter?: DynamicRouterDefinition;
    enrich?: EnrichDefinition;
    filter?: FilterDefinition;
    doFinally?: FinallyDefinition;
    idempotentConsumer?: IdempotentConsumerDefinition;
    inOnly?: InOnlyDefinition | string;
    inOut?: InOutDefinition | string;
    intercept?: InterceptDefinition;
    interceptFrom?: InterceptFromDefinition | string;
    interceptSendToEndpoint?: InterceptSendToEndpointDefinition | string;
    kamelet?: KameletDefinition | string;
    loadBalance?: LoadBalanceDefinition;
    log?: LogDefinition | string;
    loop?: LoopDefinition;
    marshal?: MarshalDefinition;
    multicast?: MulticastDefinition;
    onCompletion?: OnCompletionDefinition;
    onFallback?: OnFallbackDefinition;
    otherwise?: OtherwiseDefinition;
    pausable?: PausableDefinition;
    pipeline?: PipelineDefinition;
    policy?: PolicyDefinition;
    pollEnrich?: PollEnrichDefinition;
    process?: ProcessDefinition;
    recipientList?: RecipientListDefinition;
    removeHeader?: RemoveHeaderDefinition | string;
    removeHeaders?: RemoveHeadersDefinition | string;
    removeProperties?: RemovePropertiesDefinition | string;
    removeProperty?: RemovePropertyDefinition | string;
    resequence?: ResequenceDefinition;
    resumable?: ResumableDefinition;
    rollback?: RollbackDefinition | string;
    routingSlip?: RoutingSlipDefinition | string;
    saga?: SagaDefinition;
    sample?: SamplingDefinition | string;
    script?: ScriptDefinition;
    setBody?: SetBodyDefinition;
    setExchangePattern?: SetExchangePatternDefinition | string;
    setHeader?: SetHeaderDefinition;
    setProperty?: SetPropertyDefinition;
    sort?: SortDefinition;
    split?: SplitDefinition;
    step?: StepDefinition;
    stop?: StopDefinition;
    threads?: ThreadsDefinition;
    throttle?: ThrottleDefinition;
    throwException?: ThrowExceptionDefinition;
    to?: string;
    toD?: string;
    transacted?: TransactedDefinition;
    transform?: TransformDefinition;
    doTry?: TryDefinition;
    unmarshal?: UnmarshalDefinition;
    validate?: ValidateDefinition;
    when?: WhenDefinition;
    whenSkipSendToEndpoint?: WhenSkipSendToEndpointDefinition;
    wireTap?: WireTapDefinition;
    serviceCall?: ServiceCallDefinition | string;
    constructor(init?: Partial<ProcessorDefinition>);
}
export declare class BeansDeserializer extends CamelElement {
    constructor(init?: Partial<BeansDeserializer>);
}
export declare class ErrorHandlerBuilderDeserializer extends CamelElement {
    deadLetterChannel?: DeadLetterChannelDefinition;
    defaultErrorHandler?: DefaultErrorHandlerDefinition;
    jtaTransactionErrorHandler?: JtaTransactionErrorHandlerDefinition;
    noErrorHandler?: NoErrorHandlerDefinition;
    refErrorHandler?: RefErrorHandlerDefinition | string;
    springTransactionErrorHandler?: SpringTransactionErrorHandlerDefinition;
    constructor(init?: Partial<ErrorHandlerBuilderDeserializer>);
}
export declare class NamedBeanDefinition extends CamelElement {
    name: string;
    properties?: any;
    type: string;
    constructor(init?: Partial<NamedBeanDefinition>);
}
export declare class OutputAwareFromDefinition extends CamelElement {
    description?: string;
    id?: string;
    parameters?: any;
    steps: CamelElement[];
    uri: string;
    constructor(init?: Partial<OutputAwareFromDefinition>);
}
export declare class AggregateDefinition extends CamelElement {
    stepName?: string;
    correlationExpression?: ExpressionSubElementDefinition;
    completionPredicate?: ExpressionSubElementDefinition;
    completionTimeoutExpression?: ExpressionSubElementDefinition;
    completionSizeExpression?: ExpressionSubElementDefinition;
    optimisticLockRetryPolicy?: OptimisticLockRetryPolicyDefinition;
    parallelProcessing?: boolean;
    optimisticLocking?: boolean;
    executorService?: string;
    timeoutCheckerExecutorService?: string;
    aggregateController?: string;
    aggregationRepository?: string;
    aggregationStrategy: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    completionSize?: number;
    completionInterval?: string;
    completionTimeout?: string;
    completionTimeoutCheckerInterval?: string;
    completionFromBatchConsumer?: boolean;
    completionOnNewCorrelationGroup?: boolean;
    eagerCheckCompletion?: boolean;
    ignoreInvalidCorrelationKeys?: boolean;
    closeCorrelationKeyOnCompletion?: number;
    discardOnCompletionTimeout?: boolean;
    discardOnAggregationFailure?: boolean;
    forceCompletionOnStop?: boolean;
    completeAllOnStop?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<AggregateDefinition>);
}
export declare class BeanDefinition extends CamelElement {
    stepName?: string;
    ref?: string;
    method?: string;
    beanType?: string;
    scope?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<BeanDefinition>);
}
export declare class CatchDefinition extends CamelElement {
    stepName?: string;
    exception?: string[];
    onWhen?: WhenDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<CatchDefinition>);
}
export declare class ChoiceDefinition extends CamelElement {
    stepName?: string;
    when?: WhenDefinition[];
    otherwise?: OtherwiseDefinition;
    precondition?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ChoiceDefinition>);
}
export declare class CircuitBreakerDefinition extends CamelElement {
    stepName?: string;
    resilience4jConfiguration?: Resilience4jConfigurationDefinition;
    faultToleranceConfiguration?: FaultToleranceConfigurationDefinition;
    configuration?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    onFallback?: OnFallbackDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<CircuitBreakerDefinition>);
}
export declare class ClaimCheckDefinition extends CamelElement {
    stepName?: string;
    operation: string;
    key?: string;
    filter?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ClaimCheckDefinition>);
}
export declare class ContextScanDefinition extends CamelElement {
    stepName?: string;
    includeNonSingletons?: boolean;
    excludes?: string[];
    includes?: string[];
    constructor(init?: Partial<ContextScanDefinition>);
}
export declare class ConvertBodyDefinition extends CamelElement {
    stepName?: string;
    type: string;
    mandatory?: boolean;
    charset?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ConvertBodyDefinition>);
}
export declare class DataFormatDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<DataFormatDefinition>);
}
export declare class DelayDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    asyncDelayed?: boolean;
    callerRunsWhenRejected?: boolean;
    executorService?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<DelayDefinition>);
}
export declare class DescriptionDefinition extends CamelElement {
    stepName?: string;
    lang?: string;
    text?: string;
    constructor(init?: Partial<DescriptionDefinition>);
}
export declare class DynamicRouterDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    uriDelimiter?: string;
    ignoreInvalidEndpoints?: boolean;
    cacheSize?: number;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<DynamicRouterDefinition>);
}
export declare class EnrichDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: string;
    aggregateOnException?: boolean;
    shareUnitOfWork?: boolean;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    allowOptimisedComponents?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<EnrichDefinition>);
}
export declare class ErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    deadLetterChannel?: DeadLetterChannelDefinition;
    defaultErrorHandler?: DefaultErrorHandlerDefinition;
    jtaTransactionErrorHandler?: JtaTransactionErrorHandlerDefinition;
    noErrorHandler?: NoErrorHandlerDefinition;
    springTransactionErrorHandler?: SpringTransactionErrorHandlerDefinition;
    constructor(init?: Partial<ErrorHandlerDefinition>);
}
export declare class ExpressionSubElementDefinition extends CamelElement {
    stepName?: string;
    constant?: ConstantExpression | string;
    csimple?: CSimpleExpression | string;
    datasonnet?: DatasonnetExpression | string;
    exchangeProperty?: ExchangePropertyExpression | string;
    groovy?: GroovyExpression | string;
    header?: HeaderExpression | string;
    hl7terser?: Hl7TerserExpression | string;
    joor?: JoorExpression | string;
    jq?: JqExpression | string;
    js?: JavaScriptExpression | string;
    jsonpath?: JsonPathExpression | string;
    language?: LanguageExpression;
    method?: MethodCallExpression | string;
    mvel?: MvelExpression | string;
    ognl?: OgnlExpression | string;
    python?: PythonExpression | string;
    ref?: RefExpression | string;
    simple?: SimpleExpression | string;
    spel?: SpELExpression | string;
    tokenize?: TokenizerExpression | string;
    xpath?: XPathExpression | string;
    xquery?: XQueryExpression | string;
    xtokenize?: XMLTokenizerExpression | string;
    constructor(init?: Partial<ExpressionSubElementDefinition>);
}
export declare class FaultToleranceConfigurationDefinition extends CamelElement {
    stepName?: string;
    circuitBreaker?: string;
    delay?: string;
    successThreshold?: number;
    requestVolumeThreshold?: number;
    failureRatio?: number;
    timeoutEnabled?: boolean;
    timeoutDuration?: string;
    timeoutPoolSize?: number;
    timeoutScheduledExecutorService?: string;
    bulkheadEnabled?: boolean;
    bulkheadMaxConcurrentCalls?: number;
    bulkheadWaitingTaskQueue?: number;
    bulkheadExecutorService?: string;
    id?: string;
    constructor(init?: Partial<FaultToleranceConfigurationDefinition>);
}
export declare class FilterDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    statusPropertyName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<FilterDefinition>);
}
export declare class FinallyDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<FinallyDefinition>);
}
export declare class FromDefinition extends CamelElement {
    stepName?: string;
    uri: string;
    id?: string;
    description?: string;
    parameters?: any;
    steps: CamelElement[];
    constructor(init?: Partial<FromDefinition>);
}
export declare class GlobalOptionDefinition extends CamelElement {
    stepName?: string;
    key: string;
    value: string;
    constructor(init?: Partial<GlobalOptionDefinition>);
}
export declare class GlobalOptionsDefinition extends CamelElement {
    stepName?: string;
    globalOption?: GlobalOptionDefinition[];
    constructor(init?: Partial<GlobalOptionsDefinition>);
}
export declare class IdempotentConsumerDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    idempotentRepository: string;
    eager?: boolean;
    completionEager?: boolean;
    skipDuplicate?: boolean;
    removeOnFailure?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<IdempotentConsumerDefinition>);
}
export declare class InOnlyDefinition extends CamelElement {
    stepName?: string;
    uri: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    constructor(init?: Partial<InOnlyDefinition>);
}
export declare class InOutDefinition extends CamelElement {
    stepName?: string;
    uri: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    constructor(init?: Partial<InOutDefinition>);
}
export declare class InputTypeDefinition extends CamelElement {
    stepName?: string;
    urn: string;
    validate?: boolean;
    id?: string;
    description?: string;
    constructor(init?: Partial<InputTypeDefinition>);
}
export declare class InterceptDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<InterceptDefinition>);
}
export declare class InterceptFromDefinition extends CamelElement {
    stepName?: string;
    uri?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<InterceptFromDefinition>);
}
export declare class InterceptSendToEndpointDefinition extends CamelElement {
    stepName?: string;
    uri: string;
    skipSendToOriginalEndpoint?: string;
    afterUri?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<InterceptSendToEndpointDefinition>);
}
export declare class KameletDefinition extends CamelElement {
    stepName?: string;
    name: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    constructor(init?: Partial<KameletDefinition>);
}
export declare class LoadBalanceDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    inheritErrorHandler?: boolean;
    id?: string;
    description?: string;
    customLoadBalancer?: CustomLoadBalancerDefinition | string;
    failover?: FailoverLoadBalancerDefinition;
    random?: RandomLoadBalancerDefinition;
    roundRobin?: RoundRobinLoadBalancerDefinition;
    steps?: CamelElement[];
    sticky?: StickyLoadBalancerDefinition;
    topic?: TopicLoadBalancerDefinition;
    weighted?: WeightedLoadBalancerDefinition;
    constructor(init?: Partial<LoadBalanceDefinition>);
}
export declare class LogDefinition extends CamelElement {
    stepName?: string;
    message: string;
    loggingLevel?: string;
    logName?: string;
    marker?: string;
    logger?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<LogDefinition>);
}
export declare class LoopDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    copy?: boolean;
    doWhile?: boolean;
    breakOnShutdown?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<LoopDefinition>);
}
export declare class MarshalDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    any23?: Any23DataFormat | string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    inheritErrorHandler?: boolean;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    xstream?: XStreamDataFormat | string;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<MarshalDefinition>);
}
export declare class MulticastDefinition extends CamelElement {
    stepName?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    parallelAggregate?: boolean;
    parallelProcessing?: boolean;
    streaming?: boolean;
    stopOnException?: boolean;
    timeout?: string;
    executorService?: string;
    onPrepare?: string;
    shareUnitOfWork?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<MulticastDefinition>);
}
export declare class OnCompletionDefinition extends CamelElement {
    stepName?: string;
    mode?: string;
    onCompleteOnly?: boolean;
    onFailureOnly?: boolean;
    parallelProcessing?: boolean;
    executorService?: string;
    useOriginalMessage?: boolean;
    onWhen?: WhenDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OnCompletionDefinition>);
}
export declare class OnExceptionDefinition extends CamelElement {
    stepName?: string;
    exception?: string[];
    onWhen?: WhenDefinition;
    retryWhile?: ExpressionSubElementDefinition;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    redeliveryPolicyRef?: string;
    handled?: ExpressionSubElementDefinition;
    continued?: ExpressionSubElementDefinition;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OnExceptionDefinition>);
}
export declare class OnFallbackDefinition extends CamelElement {
    stepName?: string;
    fallbackViaNetwork?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OnFallbackDefinition>);
}
export declare class OptimisticLockRetryPolicyDefinition extends CamelElement {
    stepName?: string;
    maximumRetries?: number;
    retryDelay?: string;
    maximumRetryDelay?: string;
    exponentialBackOff?: boolean;
    randomBackOff?: boolean;
    constructor(init?: Partial<OptimisticLockRetryPolicyDefinition>);
}
export declare class OtherwiseDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OtherwiseDefinition>);
}
export declare class OutputDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    disabled?: boolean;
    id?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OutputDefinition>);
}
export declare class OutputTypeDefinition extends CamelElement {
    stepName?: string;
    urn: string;
    validate?: boolean;
    id?: string;
    description?: string;
    constructor(init?: Partial<OutputTypeDefinition>);
}
export declare class PackageScanDefinition extends CamelElement {
    stepName?: string;
    package?: string[];
    excludes?: string[];
    includes?: string[];
    constructor(init?: Partial<PackageScanDefinition>);
}
export declare class PausableDefinition extends CamelElement {
    stepName?: string;
    consumerListener: string;
    untilCheck: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<PausableDefinition>);
}
export declare class PipelineDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<PipelineDefinition>);
}
export declare class PolicyDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<PolicyDefinition>);
}
export declare class PollEnrichDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: string;
    aggregateOnException?: boolean;
    timeout?: string;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<PollEnrichDefinition>);
}
export declare class ProcessDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ProcessDefinition>);
}
export declare class PropertyDefinition extends CamelElement {
    stepName?: string;
    key: string;
    value: string;
    constructor(init?: Partial<PropertyDefinition>);
}
export declare class PropertyExpressionDefinition extends CamelElement {
    stepName?: string;
    key: string;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<PropertyExpressionDefinition>);
}
export declare class RecipientListDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    delimiter?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    parallelAggregate?: boolean;
    parallelProcessing?: boolean;
    timeout?: string;
    executorService?: string;
    stopOnException?: boolean;
    ignoreInvalidEndpoints?: boolean;
    streaming?: boolean;
    onPrepare?: string;
    cacheSize?: number;
    shareUnitOfWork?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RecipientListDefinition>);
}
export declare class RedeliveryPolicyDefinition extends CamelElement {
    stepName?: string;
    maximumRedeliveries?: number;
    redeliveryDelay?: string;
    asyncDelayedRedelivery?: boolean;
    backOffMultiplier?: number;
    useExponentialBackOff?: boolean;
    collisionAvoidanceFactor?: number;
    useCollisionAvoidance?: boolean;
    maximumRedeliveryDelay?: string;
    retriesExhaustedLogLevel?: string;
    retryAttemptedLogLevel?: string;
    retryAttemptedLogInterval?: number;
    logRetryAttempted?: boolean;
    logStackTrace?: boolean;
    logRetryStackTrace?: boolean;
    logHandled?: boolean;
    logNewException?: boolean;
    logContinued?: boolean;
    logExhausted?: boolean;
    logExhaustedMessageHistory?: boolean;
    logExhaustedMessageBody?: boolean;
    disableRedelivery?: boolean;
    delayPattern?: string;
    allowRedeliveryWhileStopping?: boolean;
    exchangeFormatterRef?: string;
    id?: string;
    constructor(init?: Partial<RedeliveryPolicyDefinition>);
}
export declare class RemoveHeaderDefinition extends CamelElement {
    stepName?: string;
    name: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RemoveHeaderDefinition>);
}
export declare class RemoveHeadersDefinition extends CamelElement {
    stepName?: string;
    pattern: string;
    excludePattern?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RemoveHeadersDefinition>);
}
export declare class RemovePropertiesDefinition extends CamelElement {
    stepName?: string;
    pattern: string;
    excludePattern?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RemovePropertiesDefinition>);
}
export declare class RemovePropertyDefinition extends CamelElement {
    stepName?: string;
    name: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RemovePropertyDefinition>);
}
export declare class ResequenceDefinition extends CamelElement {
    stepName?: string;
    expression: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    batchConfig?: BatchResequencerConfig;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    streamConfig?: StreamResequencerConfig;
    constructor(init?: Partial<ResequenceDefinition>);
}
export declare class Resilience4jConfigurationDefinition extends CamelElement {
    stepName?: string;
    circuitBreaker?: string;
    config?: string;
    failureRateThreshold?: number;
    permittedNumberOfCallsInHalfOpenState?: number;
    throwExceptionWhenHalfOpenOrOpenState?: boolean;
    slidingWindowSize?: number;
    slidingWindowType?: string;
    minimumNumberOfCalls?: number;
    writableStackTraceEnabled?: boolean;
    waitDurationInOpenState?: number;
    automaticTransitionFromOpenToHalfOpenEnabled?: boolean;
    slowCallRateThreshold?: number;
    slowCallDurationThreshold?: number;
    id?: string;
    constructor(init?: Partial<Resilience4jConfigurationDefinition>);
}
export declare class RestContextRefDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    constructor(init?: Partial<RestContextRefDefinition>);
}
export declare class ResumableDefinition extends CamelElement {
    stepName?: string;
    resumeStrategy: string;
    intermittent?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ResumableDefinition>);
}
export declare class RollbackDefinition extends CamelElement {
    stepName?: string;
    message?: string;
    markRollbackOnly?: boolean;
    markRollbackOnlyLast?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RollbackDefinition>);
}
export declare class RouteBuilderDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    id?: string;
    constructor(init?: Partial<RouteBuilderDefinition>);
}
export declare class RouteConfigurationContextRefDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    constructor(init?: Partial<RouteConfigurationContextRefDefinition>);
}
export declare class RouteConfigurationDefinition extends CamelElement {
    stepName?: string;
    errorHandler?: ErrorHandlerDefinition;
    intercept?: InterceptDefinition[];
    interceptFrom?: InterceptFromDefinition[];
    interceptSendToEndpoint?: InterceptSendToEndpointDefinition[];
    onException?: OnExceptionDefinition[];
    onCompletion?: OnCompletionDefinition[];
    precondition?: string;
    id?: string;
    constructor(init?: Partial<RouteConfigurationDefinition>);
}
export declare class RouteContextRefDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    constructor(init?: Partial<RouteContextRefDefinition>);
}
export declare class RouteDefinition extends CamelElement {
    stepName?: string;
    group?: string;
    nodePrefixId?: string;
    routeConfigurationId?: string;
    precondition?: string;
    trace?: boolean;
    messageHistory?: boolean;
    logMask?: boolean;
    autoStartup?: boolean;
    startupOrder?: number;
    id?: string;
    description?: string;
    from: FromDefinition;
    routePolicy?: string;
    streamCaching?: boolean;
    constructor(init?: Partial<RouteDefinition>);
}
export declare class RouteTemplateBeanDefinition extends CamelElement {
    stepName?: string;
    beanType?: string;
    name: string;
    properties?: any;
    property?: PropertyDefinition[];
    script?: string;
    type: string;
    constructor(init?: Partial<RouteTemplateBeanDefinition>);
}
export declare class RouteTemplateDefinition extends CamelElement {
    stepName?: string;
    route?: RouteDefinition;
    id: string;
    beans?: NamedBeanDefinition[];
    from?: FromDefinition;
    parameters?: RouteTemplateParameterDefinition[];
    constructor(init?: Partial<RouteTemplateDefinition>);
}
export declare class RouteTemplateParameterDefinition extends CamelElement {
    stepName?: string;
    defaultValue?: string;
    description?: string;
    name: string;
    required?: boolean;
    constructor(init?: Partial<RouteTemplateParameterDefinition>);
}
export declare class RoutingSlipDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    uriDelimiter?: string;
    ignoreInvalidEndpoints?: boolean;
    cacheSize?: number;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<RoutingSlipDefinition>);
}
export declare class SagaActionUriDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    disabled?: boolean;
    id?: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    uri: string;
    constructor(init?: Partial<SagaActionUriDefinition>);
}
export declare class SagaDefinition extends CamelElement {
    stepName?: string;
    sagaService?: string;
    propagation?: string;
    completionMode?: string;
    timeout?: string;
    compensation?: string;
    completion?: string;
    option?: PropertyExpressionDefinition[];
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<SagaDefinition>);
}
export declare class SamplingDefinition extends CamelElement {
    stepName?: string;
    samplePeriod?: string;
    messageFrequency?: number;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<SamplingDefinition>);
}
export declare class ScriptDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ScriptDefinition>);
}
export declare class SetBodyDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<SetBodyDefinition>);
}
export declare class SetExchangePatternDefinition extends CamelElement {
    stepName?: string;
    pattern: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<SetExchangePatternDefinition>);
}
export declare class SetHeaderDefinition extends CamelElement {
    stepName?: string;
    name: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<SetHeaderDefinition>);
}
export declare class SetPropertyDefinition extends CamelElement {
    stepName?: string;
    name: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<SetPropertyDefinition>);
}
export declare class SortDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    comparator?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<SortDefinition>);
}
export declare class SplitDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    delimiter?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    parallelAggregate?: boolean;
    parallelProcessing?: boolean;
    streaming?: boolean;
    stopOnException?: boolean;
    timeout?: string;
    executorService?: string;
    onPrepare?: string;
    shareUnitOfWork?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<SplitDefinition>);
}
export declare class StepDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<StepDefinition>);
}
export declare class StopDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<StopDefinition>);
}
export declare class TemplatedRouteBeanDefinition extends CamelElement {
    stepName?: string;
    name: string;
    type: string;
    beanType?: string;
    property?: PropertyDefinition[];
    script?: string;
    properties?: any;
    constructor(init?: Partial<TemplatedRouteBeanDefinition>);
}
export declare class TemplatedRouteDefinition extends CamelElement {
    stepName?: string;
    routeTemplateRef: string;
    routeId?: string;
    prefixId?: string;
    beans?: NamedBeanDefinition[];
    parameters?: TemplatedRouteParameterDefinition[];
    constructor(init?: Partial<TemplatedRouteDefinition>);
}
export declare class TemplatedRouteParameterDefinition extends CamelElement {
    stepName?: string;
    name: string;
    value: string;
    constructor(init?: Partial<TemplatedRouteParameterDefinition>);
}
export declare class ThreadPoolProfileDefinition extends CamelElement {
    stepName?: string;
    defaultProfile?: boolean;
    poolSize?: number;
    maxPoolSize?: number;
    keepAliveTime?: number;
    timeUnit?: string;
    maxQueueSize?: number;
    allowCoreThreadTimeOut?: boolean;
    rejectedPolicy?: string;
    id?: string;
    description?: string;
    constructor(init?: Partial<ThreadPoolProfileDefinition>);
}
export declare class ThreadsDefinition extends CamelElement {
    stepName?: string;
    executorService?: string;
    poolSize?: number;
    maxPoolSize?: number;
    keepAliveTime?: number;
    timeUnit?: string;
    maxQueueSize?: number;
    allowCoreThreadTimeOut?: boolean;
    threadName?: string;
    rejectedPolicy?: string;
    callerRunsWhenRejected?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ThreadsDefinition>);
}
export declare class ThrottleDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    correlationExpression?: ExpressionSubElementDefinition;
    executorService?: string;
    timePeriodMillis?: string;
    asyncDelayed?: boolean;
    callerRunsWhenRejected?: boolean;
    rejectExecution?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ThrottleDefinition>);
}
export declare class ThrowExceptionDefinition extends CamelElement {
    stepName?: string;
    message?: string;
    exceptionType?: string;
    ref?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ThrowExceptionDefinition>);
}
export declare class ToDefinition extends CamelElement {
    stepName?: string;
    uri: string;
    disabled?: boolean;
    pattern?: string;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    constructor(init?: Partial<ToDefinition>);
}
export declare class ToDynamicDefinition extends CamelElement {
    stepName?: string;
    uri: string;
    pattern?: string;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    allowOptimisedComponents?: boolean;
    autoStartComponents?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    constructor(init?: Partial<ToDynamicDefinition>);
}
export declare class TransactedDefinition extends CamelElement {
    stepName?: string;
    ref?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<TransactedDefinition>);
}
export declare class TransformDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<TransformDefinition>);
}
export declare class TryDefinition extends CamelElement {
    stepName?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    doCatch?: CatchDefinition[];
    doFinally?: FinallyDefinition;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<TryDefinition>);
}
export declare class UnmarshalDefinition extends CamelElement {
    stepName?: string;
    allowNullBody?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    any23?: Any23DataFormat | string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    inheritErrorHandler?: boolean;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    xstream?: XStreamDataFormat | string;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<UnmarshalDefinition>);
}
export declare class ValidateDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    predicateExceptionFactory?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    constructor(init?: Partial<ValidateDefinition>);
}
export declare class ValueDefinition extends CamelElement {
    stepName?: string;
    value?: string;
    constructor(init?: Partial<ValueDefinition>);
}
export declare class WhenDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<WhenDefinition>);
}
export declare class WhenSkipSendToEndpointDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<WhenSkipSendToEndpointDefinition>);
}
export declare class WireTapDefinition extends CamelElement {
    stepName?: string;
    copy?: boolean;
    dynamicUri?: boolean;
    onPrepare?: string;
    executorService?: string;
    uri: string;
    pattern?: string;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    allowOptimisedComponents?: boolean;
    autoStartComponents?: boolean;
    disabled?: boolean;
    id?: string;
    description?: string;
    inheritErrorHandler?: boolean;
    parameters?: any;
    constructor(init?: Partial<WireTapDefinition>);
}
export declare class BlacklistServiceCallServiceFilterConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    servers?: string[];
    constructor(init?: Partial<BlacklistServiceCallServiceFilterConfiguration>);
}
export declare class CachingServiceCallServiceDiscoveryConfiguration extends CamelElement {
    combinedServiceDiscovery?: CombinedServiceCallServiceDiscoveryConfiguration;
    consulServiceDiscovery?: ConsulServiceCallServiceDiscoveryConfiguration;
    dnsServiceDiscovery?: DnsServiceCallServiceDiscoveryConfiguration;
    id?: string;
    kubernetesServiceDiscovery?: KubernetesServiceCallServiceDiscoveryConfiguration;
    properties?: PropertyDefinition[];
    staticServiceDiscovery?: StaticServiceCallServiceDiscoveryConfiguration;
    timeout?: number;
    units?: string;
    constructor(init?: Partial<CachingServiceCallServiceDiscoveryConfiguration>);
}
export declare class CombinedServiceCallServiceDiscoveryConfiguration extends CamelElement {
    cachingServiceDiscovery?: CachingServiceCallServiceDiscoveryConfiguration;
    consulServiceDiscovery?: ConsulServiceCallServiceDiscoveryConfiguration;
    dnsServiceDiscovery?: DnsServiceCallServiceDiscoveryConfiguration;
    id?: string;
    kubernetesServiceDiscovery?: KubernetesServiceCallServiceDiscoveryConfiguration;
    properties?: PropertyDefinition[];
    staticServiceDiscovery?: StaticServiceCallServiceDiscoveryConfiguration;
    constructor(init?: Partial<CombinedServiceCallServiceDiscoveryConfiguration>);
}
export declare class CombinedServiceCallServiceFilterConfiguration extends CamelElement {
    blacklistServiceFilter?: BlacklistServiceCallServiceFilterConfiguration;
    customServiceFilter?: CustomServiceCallServiceFilterConfiguration;
    healthyServiceFilter?: HealthyServiceCallServiceFilterConfiguration;
    id?: string;
    passThroughServiceFilter?: PassThroughServiceCallServiceFilterConfiguration;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<CombinedServiceCallServiceFilterConfiguration>);
}
export declare class ConsulServiceCallServiceDiscoveryConfiguration extends CamelElement {
    aclToken?: string;
    blockSeconds?: number;
    connectTimeoutMillis?: number;
    datacenter?: string;
    id?: string;
    password?: string;
    properties?: PropertyDefinition[];
    readTimeoutMillis?: number;
    url?: string;
    userName?: string;
    writeTimeoutMillis?: number;
    constructor(init?: Partial<ConsulServiceCallServiceDiscoveryConfiguration>);
}
export declare class CustomServiceCallServiceFilterConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    ref?: string;
    constructor(init?: Partial<CustomServiceCallServiceFilterConfiguration>);
}
export declare class DefaultServiceCallServiceLoadBalancerConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<DefaultServiceCallServiceLoadBalancerConfiguration>);
}
export declare class DnsServiceCallServiceDiscoveryConfiguration extends CamelElement {
    domain?: string;
    id?: string;
    properties?: PropertyDefinition[];
    proto?: string;
    constructor(init?: Partial<DnsServiceCallServiceDiscoveryConfiguration>);
}
export declare class HealthyServiceCallServiceFilterConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<HealthyServiceCallServiceFilterConfiguration>);
}
export declare class KubernetesServiceCallServiceDiscoveryConfiguration extends CamelElement {
    apiVersion?: string;
    caCertData?: string;
    caCertFile?: string;
    clientCertData?: string;
    clientCertFile?: string;
    clientKeyAlgo?: string;
    clientKeyData?: string;
    clientKeyFile?: string;
    clientKeyPassphrase?: string;
    dnsDomain?: string;
    id?: string;
    lookup?: string;
    masterUrl?: string;
    namespace?: string;
    oauthToken?: string;
    password?: string;
    portName?: string;
    portProtocol?: string;
    properties?: PropertyDefinition[];
    trustCerts?: boolean;
    username?: string;
    constructor(init?: Partial<KubernetesServiceCallServiceDiscoveryConfiguration>);
}
export declare class PassThroughServiceCallServiceFilterConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<PassThroughServiceCallServiceFilterConfiguration>);
}
export declare class ServiceCallConfigurationDefinition extends CamelElement {
    stepName?: string;
    expression?: ServiceCallExpressionConfiguration;
    uri?: string;
    component?: string;
    pattern?: string;
    serviceDiscoveryRef?: string;
    serviceFilterRef?: string;
    serviceChooserRef?: string;
    loadBalancerRef?: string;
    expressionRef?: string;
    id?: string;
    blacklistServiceFilter?: BlacklistServiceCallServiceFilterConfiguration;
    cachingServiceDiscovery?: CachingServiceCallServiceDiscoveryConfiguration;
    combinedServiceDiscovery?: CombinedServiceCallServiceDiscoveryConfiguration;
    combinedServiceFilter?: CombinedServiceCallServiceFilterConfiguration;
    consulServiceDiscovery?: ConsulServiceCallServiceDiscoveryConfiguration;
    customServiceFilter?: CustomServiceCallServiceFilterConfiguration;
    defaultLoadBalancer?: DefaultServiceCallServiceLoadBalancerConfiguration;
    dnsServiceDiscovery?: DnsServiceCallServiceDiscoveryConfiguration;
    healthyServiceFilter?: HealthyServiceCallServiceFilterConfiguration;
    kubernetesServiceDiscovery?: KubernetesServiceCallServiceDiscoveryConfiguration;
    passThroughServiceFilter?: PassThroughServiceCallServiceFilterConfiguration;
    staticServiceDiscovery?: StaticServiceCallServiceDiscoveryConfiguration;
    zookeeperServiceDiscovery?: ZooKeeperServiceCallServiceDiscoveryConfiguration;
    constructor(init?: Partial<ServiceCallConfigurationDefinition>);
}
export declare class ServiceCallDefinition extends CamelElement {
    stepName?: string;
    name: string;
    expression?: ServiceCallExpressionConfiguration;
    uri?: string;
    component?: string;
    pattern?: string;
    configurationRef?: string;
    serviceDiscoveryRef?: string;
    serviceFilterRef?: string;
    serviceChooserRef?: string;
    loadBalancerRef?: string;
    expressionRef?: string;
    disabled?: boolean;
    id?: string;
    description?: string;
    blacklistServiceFilter?: BlacklistServiceCallServiceFilterConfiguration;
    cachingServiceDiscovery?: CachingServiceCallServiceDiscoveryConfiguration;
    combinedServiceDiscovery?: CombinedServiceCallServiceDiscoveryConfiguration;
    combinedServiceFilter?: CombinedServiceCallServiceFilterConfiguration;
    consulServiceDiscovery?: ConsulServiceCallServiceDiscoveryConfiguration;
    customServiceFilter?: CustomServiceCallServiceFilterConfiguration;
    defaultLoadBalancer?: DefaultServiceCallServiceLoadBalancerConfiguration;
    dnsServiceDiscovery?: DnsServiceCallServiceDiscoveryConfiguration;
    healthyServiceFilter?: HealthyServiceCallServiceFilterConfiguration;
    inheritErrorHandler?: boolean;
    kubernetesServiceDiscovery?: KubernetesServiceCallServiceDiscoveryConfiguration;
    passThroughServiceFilter?: PassThroughServiceCallServiceFilterConfiguration;
    staticServiceDiscovery?: StaticServiceCallServiceDiscoveryConfiguration;
    zookeeperServiceDiscovery?: ZooKeeperServiceCallServiceDiscoveryConfiguration;
    constructor(init?: Partial<ServiceCallDefinition>);
}
export declare class ServiceCallExpressionConfiguration extends CamelElement {
    expressionType?: ExpressionDefinition;
    hostHeader?: string;
    id?: string;
    portHeader?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<ServiceCallExpressionConfiguration>);
}
export declare class ServiceCallServiceChooserConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<ServiceCallServiceChooserConfiguration>);
}
export declare class ServiceCallServiceDiscoveryConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<ServiceCallServiceDiscoveryConfiguration>);
}
export declare class ServiceCallServiceFilterConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<ServiceCallServiceFilterConfiguration>);
}
export declare class ServiceCallServiceLoadBalancerConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    constructor(init?: Partial<ServiceCallServiceLoadBalancerConfiguration>);
}
export declare class StaticServiceCallServiceDiscoveryConfiguration extends CamelElement {
    id?: string;
    properties?: PropertyDefinition[];
    servers?: string[];
    constructor(init?: Partial<StaticServiceCallServiceDiscoveryConfiguration>);
}
export declare class ZooKeeperServiceCallServiceDiscoveryConfiguration extends CamelElement {
    basePath: string;
    connectionTimeout?: string;
    id?: string;
    namespace?: string;
    nodes: string;
    properties?: PropertyDefinition[];
    reconnectBaseSleepTime?: string;
    reconnectMaxRetries?: string;
    reconnectMaxSleepTime?: string;
    sessionTimeout?: string;
    constructor(init?: Partial<ZooKeeperServiceCallServiceDiscoveryConfiguration>);
}
export declare class BatchResequencerConfig extends CamelElement {
    allowDuplicates?: boolean;
    batchSize?: number;
    batchTimeout?: string;
    ignoreInvalidExchanges?: boolean;
    reverse?: boolean;
    constructor(init?: Partial<BatchResequencerConfig>);
}
export declare class StreamResequencerConfig extends CamelElement {
    capacity?: number;
    comparator?: string;
    deliveryAttemptInterval?: string;
    ignoreInvalidExchanges?: boolean;
    rejectOld?: boolean;
    timeout?: string;
    constructor(init?: Partial<StreamResequencerConfig>);
}
export declare class ASN1DataFormat extends CamelElement {
    dataFormatName?: string;
    unmarshalType?: string;
    usingIterator?: boolean;
    id?: string;
    constructor(init?: Partial<ASN1DataFormat>);
}
export declare class Any23DataFormat extends CamelElement {
    dataFormatName?: string;
    outputFormat?: string;
    baseUri?: string;
    configuration?: PropertyDefinition[];
    extractors?: string[];
    id?: string;
    constructor(init?: Partial<Any23DataFormat>);
}
export declare class AvroDataFormat extends CamelElement {
    dataFormatName?: string;
    instanceClassName?: string;
    library?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    unmarshalType?: string;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    allowUnmarshallType?: boolean;
    timezone?: string;
    autoDiscoverObjectMapper?: boolean;
    contentTypeHeader?: boolean;
    schemaResolver?: string;
    autoDiscoverSchemaResolver?: boolean;
    id?: string;
    constructor(init?: Partial<AvroDataFormat>);
}
export declare class BarcodeDataFormat extends CamelElement {
    dataFormatName?: string;
    barcodeFormat?: string;
    imageType?: string;
    width?: number;
    height?: number;
    id?: string;
    constructor(init?: Partial<BarcodeDataFormat>);
}
export declare class Base64DataFormat extends CamelElement {
    dataFormatName?: string;
    lineLength?: number;
    lineSeparator?: string;
    urlSafe?: boolean;
    id?: string;
    constructor(init?: Partial<Base64DataFormat>);
}
export declare class BindyDataFormat extends CamelElement {
    dataFormatName?: string;
    type: string;
    classType?: string;
    allowEmptyStream?: boolean;
    unwrapSingleInstance?: boolean;
    locale?: string;
    id?: string;
    constructor(init?: Partial<BindyDataFormat>);
}
export declare class CBORDataFormat extends CamelElement {
    dataFormatName?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    unmarshalType?: string;
    collectionType?: string;
    useList?: boolean;
    allowUnmarshallType?: boolean;
    prettyPrint?: boolean;
    allowJmsType?: boolean;
    enableFeatures?: string;
    disableFeatures?: string;
    id?: string;
    constructor(init?: Partial<CBORDataFormat>);
}
export declare class CryptoDataFormat extends CamelElement {
    dataFormatName?: string;
    algorithm?: string;
    keyRef?: string;
    cryptoProvider?: string;
    initVectorRef?: string;
    algorithmParameterRef?: string;
    bufferSize?: number;
    macAlgorithm?: string;
    shouldAppendHmac?: boolean;
    inline?: boolean;
    id?: string;
    constructor(init?: Partial<CryptoDataFormat>);
}
export declare class CsvDataFormat extends CamelElement {
    dataFormatName?: string;
    formatRef?: string;
    formatName?: string;
    commentMarkerDisabled?: boolean;
    commentMarker?: string;
    delimiter?: string;
    escapeDisabled?: boolean;
    escape?: string;
    headerDisabled?: boolean;
    header?: string[];
    allowMissingColumnNames?: boolean;
    ignoreEmptyLines?: boolean;
    ignoreSurroundingSpaces?: boolean;
    nullStringDisabled?: boolean;
    nullString?: string;
    quoteDisabled?: boolean;
    quote?: string;
    recordSeparatorDisabled?: string;
    recordSeparator?: string;
    skipHeaderRecord?: boolean;
    quoteMode?: string;
    ignoreHeaderCase?: boolean;
    trim?: boolean;
    trailingDelimiter?: boolean;
    marshallerFactoryRef?: string;
    lazyLoad?: boolean;
    useMaps?: boolean;
    useOrderedMaps?: boolean;
    recordConverterRef?: string;
    captureHeaderRecord?: boolean;
    id?: string;
    constructor(init?: Partial<CsvDataFormat>);
}
export declare class CustomDataFormat extends CamelElement {
    dataFormatName?: string;
    ref: string;
    id?: string;
    constructor(init?: Partial<CustomDataFormat>);
}
export declare class DataFormatsDefinition extends CamelElement {
    stepName?: string;
    any23?: Any23DataFormat | string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    xstream?: XStreamDataFormat | string;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<DataFormatsDefinition>);
}
export declare class FhirJsonDataFormat extends CamelElement {
    dataFormatName?: string;
    fhirVersion?: string;
    fhirContext?: string;
    prettyPrint?: boolean;
    parserErrorHandler?: string;
    parserOptions?: string;
    preferTypes?: string;
    forceResourceId?: string;
    serverBaseUrl?: string;
    omitResourceId?: boolean;
    encodeElementsAppliesToChildResourcesOnly?: boolean;
    encodeElements?: string;
    dontEncodeElements?: string;
    stripVersionsFromReferences?: boolean;
    overrideResourceIdWithBundleEntryFullUrl?: boolean;
    summaryMode?: boolean;
    suppressNarratives?: boolean;
    dontStripVersionsFromReferencesAtPaths?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<FhirJsonDataFormat>);
}
export declare class FhirXmlDataFormat extends CamelElement {
    dataFormatName?: string;
    fhirVersion?: string;
    fhirContext?: string;
    prettyPrint?: boolean;
    parserErrorHandler?: string;
    parserOptions?: string;
    preferTypes?: string;
    forceResourceId?: string;
    serverBaseUrl?: string;
    omitResourceId?: boolean;
    encodeElementsAppliesToChildResourcesOnly?: boolean;
    encodeElements?: string;
    dontEncodeElements?: string;
    stripVersionsFromReferences?: boolean;
    overrideResourceIdWithBundleEntryFullUrl?: boolean;
    summaryMode?: boolean;
    suppressNarratives?: boolean;
    dontStripVersionsFromReferencesAtPaths?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<FhirXmlDataFormat>);
}
export declare class FlatpackDataFormat extends CamelElement {
    dataFormatName?: string;
    definition?: string;
    fixed?: boolean;
    delimiter?: string;
    ignoreFirstRecord?: boolean;
    allowShortLines?: boolean;
    ignoreExtraColumns?: boolean;
    textQualifier?: string;
    parserFactoryRef?: string;
    id?: string;
    constructor(init?: Partial<FlatpackDataFormat>);
}
export declare class GrokDataFormat extends CamelElement {
    dataFormatName?: string;
    pattern: string;
    flattened?: boolean;
    allowMultipleMatchesPerLine?: boolean;
    namedOnly?: boolean;
    id?: string;
    constructor(init?: Partial<GrokDataFormat>);
}
export declare class GzipDeflaterDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    constructor(init?: Partial<GzipDeflaterDataFormat>);
}
export declare class HL7DataFormat extends CamelElement {
    dataFormatName?: string;
    validate?: boolean;
    id?: string;
    constructor(init?: Partial<HL7DataFormat>);
}
export declare class IcalDataFormat extends CamelElement {
    dataFormatName?: string;
    validating?: boolean;
    id?: string;
    constructor(init?: Partial<IcalDataFormat>);
}
export declare class JacksonXMLDataFormat extends CamelElement {
    dataFormatName?: string;
    xmlMapper?: string;
    prettyPrint?: boolean;
    unmarshalType?: string;
    allowUnmarshallType?: boolean;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    timezone?: string;
    enableJaxbAnnotationModule?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<JacksonXMLDataFormat>);
}
export declare class JaxbDataFormat extends CamelElement {
    dataFormatName?: string;
    contextPath: string;
    contextPathIsClassName?: boolean;
    schema?: string;
    schemaSeverityLevel?: string;
    prettyPrint?: boolean;
    objectFactory?: boolean;
    ignoreJaxbElement?: boolean;
    mustBeJaxbElement?: boolean;
    filterNonXmlChars?: boolean;
    encoding?: string;
    fragment?: boolean;
    partClass?: string;
    partNamespace?: string;
    namespacePrefixRef?: string;
    xmlStreamWriterWrapper?: string;
    schemaLocation?: string;
    noNamespaceSchemaLocation?: string;
    jaxbProviderProperties?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<JaxbDataFormat>);
}
export declare class JsonApiDataFormat extends CamelElement {
    dataFormatName?: string;
    dataFormatTypes?: string;
    mainFormatType?: string;
    id?: string;
    constructor(init?: Partial<JsonApiDataFormat>);
}
export declare class JsonDataFormat extends CamelElement {
    dataFormatName?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    autoDiscoverObjectMapper?: boolean;
    prettyPrint?: boolean;
    library?: string;
    unmarshalType?: string;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    permissions?: string;
    allowUnmarshallType?: boolean;
    timezone?: string;
    dropRootNode?: boolean;
    schemaResolver?: string;
    autoDiscoverSchemaResolver?: boolean;
    namingStrategy?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<JsonDataFormat>);
}
export declare class LZFDataFormat extends CamelElement {
    dataFormatName?: string;
    usingParallelCompression?: boolean;
    id?: string;
    constructor(init?: Partial<LZFDataFormat>);
}
export declare class MimeMultipartDataFormat extends CamelElement {
    dataFormatName?: string;
    multipartSubType?: string;
    multipartWithoutAttachment?: boolean;
    headersInline?: boolean;
    includeHeaders?: string;
    binaryContent?: boolean;
    id?: string;
    constructor(init?: Partial<MimeMultipartDataFormat>);
}
export declare class PGPDataFormat extends CamelElement {
    dataFormatName?: string;
    keyUserid?: string;
    signatureKeyUserid?: string;
    password?: string;
    signaturePassword?: string;
    keyFileName?: string;
    signatureKeyFileName?: string;
    signatureKeyRing?: string;
    armored?: boolean;
    integrity?: boolean;
    provider?: string;
    algorithm?: number;
    compressionAlgorithm?: number;
    hashAlgorithm?: number;
    signatureVerificationOption?: string;
    id?: string;
    constructor(init?: Partial<PGPDataFormat>);
}
export declare class ProtobufDataFormat extends CamelElement {
    dataFormatName?: string;
    instanceClass?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    autoDiscoverObjectMapper?: boolean;
    library?: string;
    unmarshalType?: string;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    allowUnmarshallType?: boolean;
    timezone?: string;
    schemaResolver?: string;
    autoDiscoverSchemaResolver?: boolean;
    contentTypeFormat?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<ProtobufDataFormat>);
}
export declare class RssDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    constructor(init?: Partial<RssDataFormat>);
}
export declare class SoapDataFormat extends CamelElement {
    dataFormatName?: string;
    contextPath: string;
    encoding?: string;
    elementNameStrategyRef?: string;
    version?: string;
    namespacePrefixRef?: string;
    schema?: string;
    id?: string;
    constructor(init?: Partial<SoapDataFormat>);
}
export declare class SwiftMtDataFormat extends CamelElement {
    dataFormatName?: string;
    writeInJson?: boolean;
    id?: string;
    constructor(init?: Partial<SwiftMtDataFormat>);
}
export declare class SwiftMxDataFormat extends CamelElement {
    dataFormatName?: string;
    writeConfigRef?: string;
    writeInJson?: boolean;
    readMessageId?: string;
    readConfigRef?: string;
    id?: string;
    constructor(init?: Partial<SwiftMxDataFormat>);
}
export declare class SyslogDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    constructor(init?: Partial<SyslogDataFormat>);
}
export declare class TarFileDataFormat extends CamelElement {
    dataFormatName?: string;
    usingIterator?: boolean;
    allowEmptyDirectory?: boolean;
    preservePathElements?: boolean;
    maxDecompressedSize?: number;
    id?: string;
    constructor(init?: Partial<TarFileDataFormat>);
}
export declare class ThriftDataFormat extends CamelElement {
    dataFormatName?: string;
    instanceClass?: string;
    contentTypeFormat?: string;
    contentTypeHeader?: boolean;
    id?: string;
    constructor(init?: Partial<ThriftDataFormat>);
}
export declare class TidyMarkupDataFormat extends CamelElement {
    dataFormatName?: string;
    dataObjectType?: string;
    omitXmlDeclaration?: boolean;
    id?: string;
    constructor(init?: Partial<TidyMarkupDataFormat>);
}
export declare class UniVocityCsvDataFormat extends CamelElement {
    dataFormatName?: string;
    delimiter?: string;
    quoteAllFields?: boolean;
    quote?: string;
    quoteEscape?: string;
    nullValue?: string;
    skipEmptyLines?: boolean;
    ignoreTrailingWhitespaces?: boolean;
    ignoreLeadingWhitespaces?: boolean;
    headersDisabled?: boolean;
    headerExtractionEnabled?: boolean;
    numberOfRecordsToRead?: number;
    emptyValue?: string;
    lineSeparator?: string;
    normalizedLineSeparator?: string;
    comment?: string;
    lazyLoad?: boolean;
    asMap?: boolean;
    id?: string;
    univocityHeader?: UniVocityHeader[];
    constructor(init?: Partial<UniVocityCsvDataFormat>);
}
export declare class UniVocityFixedDataFormat extends CamelElement {
    dataFormatName?: string;
    padding?: string;
    skipTrailingCharsUntilNewline?: boolean;
    recordEndsOnNewline?: boolean;
    nullValue?: string;
    skipEmptyLines?: boolean;
    ignoreTrailingWhitespaces?: boolean;
    ignoreLeadingWhitespaces?: boolean;
    headersDisabled?: boolean;
    headerExtractionEnabled?: boolean;
    numberOfRecordsToRead?: number;
    emptyValue?: string;
    lineSeparator?: string;
    normalizedLineSeparator?: string;
    comment?: string;
    lazyLoad?: boolean;
    asMap?: boolean;
    id?: string;
    univocityHeader?: UniVocityHeader[];
    constructor(init?: Partial<UniVocityFixedDataFormat>);
}
export declare class UniVocityHeader extends CamelElement {
    length?: string;
    name?: string;
    constructor(init?: Partial<UniVocityHeader>);
}
export declare class UniVocityTsvDataFormat extends CamelElement {
    dataFormatName?: string;
    escapeChar?: string;
    nullValue?: string;
    skipEmptyLines?: boolean;
    ignoreTrailingWhitespaces?: boolean;
    ignoreLeadingWhitespaces?: boolean;
    headersDisabled?: boolean;
    headerExtractionEnabled?: boolean;
    numberOfRecordsToRead?: number;
    emptyValue?: string;
    lineSeparator?: string;
    normalizedLineSeparator?: string;
    comment?: string;
    lazyLoad?: boolean;
    asMap?: boolean;
    id?: string;
    univocityHeader?: UniVocityHeader[];
    constructor(init?: Partial<UniVocityTsvDataFormat>);
}
export declare class XMLSecurityDataFormat extends CamelElement {
    dataFormatName?: string;
    xmlCipherAlgorithm?: string;
    passPhrase?: string;
    passPhraseByte?: string;
    secureTag?: string;
    secureTagContents?: boolean;
    keyCipherAlgorithm?: string;
    recipientKeyAlias?: string;
    keyOrTrustStoreParametersRef?: string;
    keyPassword?: string;
    digestAlgorithm?: string;
    mgfAlgorithm?: string;
    addKeyValueForEncryptedKey?: boolean;
    id?: string;
    constructor(init?: Partial<XMLSecurityDataFormat>);
}
export declare class XStreamDataFormat extends CamelElement {
    dataFormatName?: string;
    permissions?: string;
    encoding?: string;
    driver?: string;
    driverRef?: string;
    mode?: string;
    contentTypeHeader?: boolean;
    converters?: PropertyDefinition[];
    aliases?: PropertyDefinition[];
    omitFields?: PropertyDefinition[];
    implicitCollections?: PropertyDefinition[];
    id?: string;
    constructor(init?: Partial<XStreamDataFormat>);
}
export declare class YAMLDataFormat extends CamelElement {
    dataFormatName?: string;
    library?: string;
    unmarshalType?: string;
    _constructor?: string;
    representer?: string;
    dumperOptions?: string;
    resolver?: string;
    useApplicationContextClassLoader?: boolean;
    prettyFlow?: boolean;
    allowAnyType?: boolean;
    typeFilter?: YAMLTypeFilterDefinition[];
    maxAliasesForCollections?: number;
    allowRecursiveKeys?: boolean;
    id?: string;
    constructor(init?: Partial<YAMLDataFormat>);
}
export declare class YAMLTypeFilterDefinition extends CamelElement {
    stepName?: string;
    type?: string;
    value?: string;
    constructor(init?: Partial<YAMLTypeFilterDefinition>);
}
export declare class ZipDeflaterDataFormat extends CamelElement {
    dataFormatName?: string;
    compressionLevel?: string;
    id?: string;
    constructor(init?: Partial<ZipDeflaterDataFormat>);
}
export declare class ZipFileDataFormat extends CamelElement {
    dataFormatName?: string;
    usingIterator?: boolean;
    allowEmptyDirectory?: boolean;
    preservePathElements?: boolean;
    maxDecompressedSize?: number;
    id?: string;
    constructor(init?: Partial<ZipFileDataFormat>);
}
export declare class DeadLetterChannelDefinition extends CamelElement {
    stepName?: string;
    deadLetterUri: string;
    deadLetterHandleNewException?: boolean;
    loggerRef?: string;
    level?: string;
    logName?: string;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    redeliveryPolicyRef?: string;
    executorServiceRef?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    id?: string;
    constructor(init?: Partial<DeadLetterChannelDefinition>);
}
export declare class DefaultErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    redeliveryPolicyRef?: string;
    executorServiceRef?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    id?: string;
    constructor(init?: Partial<DefaultErrorHandlerDefinition>);
}
export declare class JtaTransactionErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    transactedPolicyRef?: string;
    rollbackLoggingLevel?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    redeliveryPolicyRef?: string;
    executorServiceRef?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    id?: string;
    constructor(init?: Partial<JtaTransactionErrorHandlerDefinition>);
}
export declare class NoErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<NoErrorHandlerDefinition>);
}
export declare class RefErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    id?: string;
    constructor(init?: Partial<RefErrorHandlerDefinition>);
}
export declare class SpringTransactionErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    transactedPolicyRef?: string;
    rollbackLoggingLevel?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    redeliveryPolicyRef?: string;
    executorServiceRef?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    id?: string;
    constructor(init?: Partial<SpringTransactionErrorHandlerDefinition>);
}
export declare class CSimpleExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<CSimpleExpression>);
}
export declare class ConstantExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<ConstantExpression>);
}
export declare class DatasonnetExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    bodyMediaType?: string;
    outputMediaType?: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<DatasonnetExpression>);
}
export declare class ExchangePropertyExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<ExchangePropertyExpression>);
}
export declare class ExpressionDefinition extends CamelElement {
    stepName?: string;
    constant?: ConstantExpression | string;
    csimple?: CSimpleExpression | string;
    datasonnet?: DatasonnetExpression | string;
    exchangeProperty?: ExchangePropertyExpression | string;
    groovy?: GroovyExpression | string;
    header?: HeaderExpression | string;
    hl7terser?: Hl7TerserExpression | string;
    joor?: JoorExpression | string;
    jq?: JqExpression | string;
    js?: JavaScriptExpression | string;
    jsonpath?: JsonPathExpression | string;
    language?: LanguageExpression;
    method?: MethodCallExpression | string;
    mvel?: MvelExpression | string;
    ognl?: OgnlExpression | string;
    python?: PythonExpression | string;
    ref?: RefExpression | string;
    simple?: SimpleExpression | string;
    spel?: SpELExpression | string;
    tokenize?: TokenizerExpression | string;
    xpath?: XPathExpression | string;
    xquery?: XQueryExpression | string;
    xtokenize?: XMLTokenizerExpression | string;
    constructor(init?: Partial<ExpressionDefinition>);
}
export declare class GroovyExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<GroovyExpression>);
}
export declare class HeaderExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<HeaderExpression>);
}
export declare class Hl7TerserExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    headerName?: string;
    propertyName?: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<Hl7TerserExpression>);
}
export declare class JavaScriptExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<JavaScriptExpression>);
}
export declare class JoorExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    preCompile?: boolean;
    singleQuotes?: boolean;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<JoorExpression>);
}
export declare class JqExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    headerName?: string;
    propertyName?: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<JqExpression>);
}
export declare class JsonPathExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    suppressExceptions?: boolean;
    allowSimple?: boolean;
    allowEasyPredicate?: boolean;
    writeAsString?: boolean;
    unpackArray?: boolean;
    option?: string;
    headerName?: string;
    propertyName?: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<JsonPathExpression>);
}
export declare class LanguageExpression extends CamelElement {
    expressionName?: string;
    language: string;
    expression: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<LanguageExpression>);
}
export declare class MethodCallExpression extends CamelElement {
    expressionName?: string;
    ref?: string;
    method?: string;
    beanType?: string;
    scope?: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<MethodCallExpression>);
}
export declare class MvelExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<MvelExpression>);
}
export declare class OgnlExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<OgnlExpression>);
}
export declare class PythonExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<PythonExpression>);
}
export declare class RefExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<RefExpression>);
}
export declare class SimpleExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<SimpleExpression>);
}
export declare class SpELExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<SpELExpression>);
}
export declare class TokenizerExpression extends CamelElement {
    expressionName?: string;
    token: string;
    endToken?: string;
    inheritNamespaceTagName?: string;
    regex?: boolean;
    xml?: boolean;
    includeTokens?: boolean;
    group?: string;
    groupDelimiter?: string;
    skipFirst?: boolean;
    headerName?: string;
    propertyName?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<TokenizerExpression>);
}
export declare class XMLTokenizerExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    mode?: string;
    group?: number;
    namespace?: PropertyDefinition[];
    headerName?: string;
    propertyName?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<XMLTokenizerExpression>);
}
export declare class XPathExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    documentType?: string;
    resultType?: string;
    saxon?: boolean;
    factoryRef?: string;
    objectModel?: string;
    logNamespaces?: boolean;
    threadSafety?: boolean;
    preCompile?: boolean;
    namespace?: PropertyDefinition[];
    headerName?: string;
    propertyName?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<XPathExpression>);
}
export declare class XQueryExpression extends CamelElement {
    expressionName?: string;
    expression: string;
    resultType?: string;
    type?: string;
    configurationRef?: string;
    namespace?: PropertyDefinition[];
    headerName?: string;
    propertyName?: string;
    trim?: boolean;
    id?: string;
    constructor(init?: Partial<XQueryExpression>);
}
export declare class CustomLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    id?: string;
    constructor(init?: Partial<CustomLoadBalancerDefinition>);
}
export declare class FailoverLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    exception?: string[];
    id?: string;
    maximumFailoverAttempts?: string;
    roundRobin?: string;
    sticky?: string;
    constructor(init?: Partial<FailoverLoadBalancerDefinition>);
}
export declare class RandomLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<RandomLoadBalancerDefinition>);
}
export declare class RoundRobinLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<RoundRobinLoadBalancerDefinition>);
}
export declare class StickyLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    correlationExpression?: ExpressionSubElementDefinition;
    id?: string;
    constructor(init?: Partial<StickyLoadBalancerDefinition>);
}
export declare class TopicLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<TopicLoadBalancerDefinition>);
}
export declare class WeightedLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    distributionRatio: string;
    distributionRatioDelimiter?: string;
    id?: string;
    roundRobin?: boolean;
    constructor(init?: Partial<WeightedLoadBalancerDefinition>);
}
export declare class ApiKeyDefinition extends CamelElement {
    stepName?: string;
    name: string;
    key: string;
    inHeader?: boolean;
    inQuery?: boolean;
    inCookie?: boolean;
    description?: string;
    constructor(init?: Partial<ApiKeyDefinition>);
}
export declare class BasicAuthDefinition extends CamelElement {
    stepName?: string;
    key: string;
    description?: string;
    constructor(init?: Partial<BasicAuthDefinition>);
}
export declare class BearerTokenDefinition extends CamelElement {
    stepName?: string;
    key: string;
    format?: string;
    description?: string;
    constructor(init?: Partial<BearerTokenDefinition>);
}
export declare class DeleteDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    to?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    routeId?: string;
    id?: string;
    description?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    constructor(init?: Partial<DeleteDefinition>);
}
export declare class GetDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    to?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    routeId?: string;
    id?: string;
    description?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    constructor(init?: Partial<GetDefinition>);
}
export declare class HeadDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    to?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    routeId?: string;
    id?: string;
    description?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    constructor(init?: Partial<HeadDefinition>);
}
export declare class MutualTLSDefinition extends CamelElement {
    stepName?: string;
    key: string;
    description?: string;
    constructor(init?: Partial<MutualTLSDefinition>);
}
export declare class OAuth2Definition extends CamelElement {
    stepName?: string;
    authorizationUrl?: string;
    description?: string;
    flow?: string;
    key: string;
    refreshUrl?: string;
    scopes?: RestPropertyDefinition[];
    tokenUrl?: string;
    constructor(init?: Partial<OAuth2Definition>);
}
export declare class OpenIdConnectDefinition extends CamelElement {
    stepName?: string;
    key: string;
    url: string;
    description?: string;
    constructor(init?: Partial<OpenIdConnectDefinition>);
}
export declare class ParamDefinition extends CamelElement {
    stepName?: string;
    name: string;
    type: string;
    defaultValue?: string;
    required?: boolean;
    collectionFormat?: string;
    arrayType?: string;
    dataType?: string;
    dataFormat?: string;
    allowableValues?: ValueDefinition[];
    examples?: RestPropertyDefinition[];
    description?: string;
    constructor(init?: Partial<ParamDefinition>);
}
export declare class PatchDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    to?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    routeId?: string;
    id?: string;
    description?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    constructor(init?: Partial<PatchDefinition>);
}
export declare class PostDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    to?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    routeId?: string;
    id?: string;
    description?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    constructor(init?: Partial<PostDefinition>);
}
export declare class PutDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    to?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    routeId?: string;
    id?: string;
    description?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    constructor(init?: Partial<PutDefinition>);
}
export declare class ResponseHeaderDefinition extends CamelElement {
    stepName?: string;
    name: string;
    collectionFormat?: string;
    arrayType?: string;
    dataType?: string;
    dataFormat?: string;
    allowableValues?: ValueDefinition[];
    example?: string;
    description?: string;
    constructor(init?: Partial<ResponseHeaderDefinition>);
}
export declare class ResponseMessageDefinition extends CamelElement {
    stepName?: string;
    code?: string;
    message: string;
    responseModel?: string;
    header?: ResponseHeaderDefinition[];
    examples?: RestPropertyDefinition[];
    constructor(init?: Partial<ResponseMessageDefinition>);
}
export declare class RestBindingDefinition extends CamelElement {
    stepName?: string;
    consumes?: string;
    produces?: string;
    bindingMode?: string;
    type?: string;
    outType?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    component?: string;
    id?: string;
    description?: string;
    constructor(init?: Partial<RestBindingDefinition>);
}
export declare class RestConfigurationDefinition extends CamelElement {
    stepName?: string;
    component?: string;
    apiComponent?: string;
    producerComponent?: string;
    scheme?: string;
    host?: string;
    port?: string;
    apiHost?: string;
    useXForwardHeaders?: boolean;
    producerApiDoc?: string;
    contextPath?: string;
    apiContextPath?: string;
    apiContextRouteId?: string;
    apiVendorExtension?: boolean;
    hostNameResolver?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    inlineRoutes?: boolean;
    jsonDataFormat?: string;
    xmlDataFormat?: string;
    componentProperty?: RestPropertyDefinition[];
    endpointProperty?: RestPropertyDefinition[];
    consumerProperty?: RestPropertyDefinition[];
    dataFormatProperty?: RestPropertyDefinition[];
    apiProperty?: RestPropertyDefinition[];
    corsHeaders?: RestPropertyDefinition[];
    constructor(init?: Partial<RestConfigurationDefinition>);
}
export declare class RestDefinition extends CamelElement {
    stepName?: string;
    path?: string;
    consumes?: string;
    produces?: string;
    disabled?: boolean;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCors?: boolean;
    apiDocs?: boolean;
    tag?: string;
    securityDefinitions?: RestSecuritiesDefinition;
    securityRequirements?: SecurityDefinition[];
    id?: string;
    description?: string;
    delete?: DeleteDefinition[];
    get?: GetDefinition[];
    head?: HeadDefinition[];
    patch?: PatchDefinition[];
    post?: PostDefinition[];
    put?: PutDefinition[];
    constructor(init?: Partial<RestDefinition>);
}
export declare class RestPropertyDefinition extends CamelElement {
    stepName?: string;
    key: string;
    value: string;
    constructor(init?: Partial<RestPropertyDefinition>);
}
export declare class RestSecuritiesDefinition extends CamelElement {
    stepName?: string;
    apiKey?: ApiKeyDefinition;
    basicAuth?: BasicAuthDefinition;
    bearer?: BearerTokenDefinition;
    mutualTls?: MutualTLSDefinition;
    oauth2?: OAuth2Definition;
    openIdConnect?: OpenIdConnectDefinition;
    constructor(init?: Partial<RestSecuritiesDefinition>);
}
export declare class RestsDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    rest?: RestDefinition[];
    constructor(init?: Partial<RestsDefinition>);
}
export declare class SecurityDefinition extends CamelElement {
    stepName?: string;
    key: string;
    scopes?: string;
    constructor(init?: Partial<SecurityDefinition>);
}
export declare class CustomTransformerDefinition extends CamelElement {
    stepName?: string;
    className?: string;
    fromType?: string;
    ref?: string;
    scheme?: string;
    toType?: string;
    constructor(init?: Partial<CustomTransformerDefinition>);
}
export declare class DataFormatTransformerDefinition extends CamelElement {
    stepName?: string;
    any23?: Any23DataFormat | string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    fromType?: string;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    scheme?: string;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    toType?: string;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    xstream?: XStreamDataFormat | string;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<DataFormatTransformerDefinition>);
}
export declare class EndpointTransformerDefinition extends CamelElement {
    stepName?: string;
    fromType?: string;
    ref?: string;
    scheme?: string;
    toType?: string;
    uri?: string;
    constructor(init?: Partial<EndpointTransformerDefinition>);
}
export declare class TransformersDefinition extends CamelElement {
    stepName?: string;
    customTransformer?: CustomTransformerDefinition;
    dataFormatTransformer?: DataFormatTransformerDefinition;
    endpointTransformer?: EndpointTransformerDefinition;
    constructor(init?: Partial<TransformersDefinition>);
}
export declare class CustomValidatorDefinition extends CamelElement {
    stepName?: string;
    className?: string;
    ref?: string;
    type?: string;
    constructor(init?: Partial<CustomValidatorDefinition>);
}
export declare class EndpointValidatorDefinition extends CamelElement {
    stepName?: string;
    ref?: string;
    type?: string;
    uri?: string;
    constructor(init?: Partial<EndpointValidatorDefinition>);
}
export declare class PredicateValidatorDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    type?: string;
    constructor(init?: Partial<PredicateValidatorDefinition>);
}
export declare class ValidatorsDefinition extends CamelElement {
    stepName?: string;
    customValidator?: CustomValidatorDefinition;
    endpointValidator?: EndpointValidatorDefinition;
    predicateValidator?: PredicateValidatorDefinition;
    constructor(init?: Partial<ValidatorsDefinition>);
}
