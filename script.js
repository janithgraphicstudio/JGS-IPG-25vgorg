   // API Configuration
        const API_KEY = 'AIzaSyAhMy0sOVa4HLKJyKb5f6tgCkMTPJvTaV8';
       const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        // Add API status indicator
        const apiStatus = document.createElement('div');
        apiStatus.className = 'api-status disconnected';
        apiStatus.innerHTML = '<div class="status-dot"></div><span>API Disconnected</span>';
        document.body.appendChild(apiStatus);
        
        // DOM Elements
        const welcomeScreen = document.getElementById('welcomeScreen');
        const getStartedBtn = document.getElementById('getStartedBtn');
        const mainContainer = document.getElementById('mainContainer');
        const typingEffect = document.getElementById('typingEffect');
        const signupBtn = document.getElementById('signupBtn');
        const trySinhaBtn = document.getElementById('trySinhaBtn');
        const verificationPopup = document.getElementById('verificationPopup');
        const verifyBtn = document.getElementById('verifyBtn');
          const closePopupBtn = document.getElementById('closePopupBtn');
        const verificationCode = document.getElementById('verificationCode');
        const uploadBox = document.getElementById('uploadBox');
        const fileInput = document.getElementById('fileInput');
        const previewContainer = document.getElementById('previewContainer');
        const previewImage = document.getElementById('previewImage');
        const previewPlaceholder = document.querySelector('.preview-placeholder');
        const urlInput = document.getElementById('urlInput');
        const sendBtn = document.getElementById('sendBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const currentVersionDisplay = document.getElementById('currentVersionDisplay');
        const settingsDropdown = document.getElementById('settingsDropdown');
        const advanceOption = document.getElementById('advanceOption');
        const superOption = document.getElementById('superOption');
        const analysisSection = document.getElementById('analysisSection');
        const thinkingProcess = document.getElementById('thinkingProcess');
        const generatedPrompt = document.getElementById('generatedPrompt');
        const copyBtn = document.getElementById('copyBtn');
        const actionButtons = document.getElementById('actionButtons');
        const limitMessage = document.getElementById('limitMessage');
        const limitSignupBtn = document.getElementById('limitSignupBtn');
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingText = document.getElementById('loadingText');
        
        // App State
        let currentVersion = '1.0';
        let isRegistered = localStorage.getItem('isRegistered') === 'true';
        let dailyUsage = parseInt(localStorage.getItem('dailyUsage')) || 0;
        const lastUsageDate = localStorage.getItem('lastUsageDate');
        const today = new Date().toDateString();
        
        // Reset daily usage if it's a new day
        if (lastUsageDate !== today) {
            dailyUsage = 0;
            localStorage.setItem('lastUsageDate', today);
            localStorage.setItem('dailyUsage', dailyUsage);
        }
        
        // Check if user is registered and update UI
        if (isRegistered) {
            signupBtn.innerHTML = 'Registered ✓';
            signupBtn.classList.remove('btn-primary');
            signupBtn.classList.add('btn-success');
            signupBtn.disabled = true;
            
            // Unlock advanced options
            advanceOption.classList.remove('locked');
            superOption.classList.remove('locked');
             advanceOption.innerHTML = 'Advance Thinking';
            superOption.innerHTML = 'Super Thinking';
        }
        
        // Check daily limit for unregistered users
        if (!isRegistered && dailyUsage >= 3) {
            sendBtn.disabled = true;
            limitMessage.style.display = 'flex';
        }
        
        // Check API connection on startup
        checkApiConnection();
        
        async function checkApiConnection() {
            loadingText.textContent = 'Connecting to SINHA AI API Server...';
            loadingScreen.classList.add('active');
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: "Hello"
                            }]
                        }]
                    })
                });
                
                if (response.ok) {
                    apiStatus.className = 'api-status connected';
                    apiStatus.innerHTML = '<div class="status-dot"></div><span>API Connected</span>';
                } else {
                    throw new Error('API connection failed');
                }
            } catch (error) {
                console.error('API Connection Error:', error);
                apiStatus.className = 'api-status disconnected';
                apiStatus.innerHTML = '<div class="status-dot"></div><span>API Error</span>';
                
                // Fallback to simulated responses if API fails
                alert('API connection failed. Using simulated responses for demonstration.');
            } finally {
                loadingScreen.classList.remove('active');
            }
        }
        
        // Typing Effect for Welcome Message
        const welcomeMessages = [
            "Analyze images with precision...",
            "Generate perfect prompts...",
            "Unlock AI creativity..."
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWelcomeMessage() {
            const currentMessage = welcomeMessages[messageIndex];
            
            if (isDeleting) {
                typingEffect.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEffect.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentMessage.length) {
                isDeleting = true;
                setTimeout(typeWelcomeMessage, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % welcomeMessages.length;
                setTimeout(typeWelcomeMessage, 500);
            } else {
                setTimeout(typeWelcomeMessage, isDeleting ? 50 : 100);
            }
        }
        
        // Event Listeners
        getStartedBtn.addEventListener('click', () => {
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                mainContainer.style.display = 'block';
                typeWelcomeMessage();
            }, 100);
        });
        
        signupBtn.addEventListener('click', () => {
            verificationPopup.classList.add('active');
        });
        
        trySinhaBtn.addEventListener('click', () => {
            window.open('https://sites.google.com/view/sinha-ai/home', '_blank');
        });
        
        verifyBtn.addEventListener('click', () => {
            const code = verificationCode.value.trim();
            
            if (code === 'GDF3456AF') {
                isRegistered = true;
                localStorage.setItem('isRegistered', 'true');
                
                signupBtn.innerHTML = 'Registered ✓';
                signupBtn.classList.remove('btn-primary');
                signupBtn.classList.add('btn-success');
                signupBtn.disabled = true;
                
                verificationPopup.classList.remove('active');
                verificationCode.value = '';
                
                // Unlock advanced options
                advanceOption.classList.remove('locked');
                superOption.classList.remove('locked');
                 advanceOption.innerHTML = '<i class="fa-solid fa-medal"></i> Advance Thinking';
            superOption.innerHTML = '<i class="fa-solid fa-bomb"></i> Super Thinking';
                
                // Remove daily limit
                sendBtn.disabled = false;
                limitMessage.style.display = 'none';
            } else {
                alert('Invalid verification code. Please try again.');
            }
        });
        
        limitSignupBtn.addEventListener('click', () => {
            verificationPopup.classList.add('active');
        });
        
        // Settings Dropdown
        settingsBtn.addEventListener('click', () => {
            settingsDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
                settingsDropdown.classList.remove('active');
            }
        });
        
        // Version Selection
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('locked')) return;
                
                document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentVersion = item.dataset.version;
                settingsDropdown.classList.remove('active');
                currentVersionDisplay.textContent = item.textContent.trim();
            });
        });
        // Close Popup
         closePopupBtn.addEventListener('click', () => {
            verificationPopup.classList.remove('active');
        });

        // Close popup when clicking on the overlay
        verificationPopup.addEventListener('click', (e) => {
            if (e.target === verificationPopup) {
                verificationPopup.classList.remove('active');
            }
        });

        
        // File Upload
        uploadBox.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '#6c5ce7';
            uploadBox.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
        });
        
        uploadBox.addEventListener('dragleave', () => {
            uploadBox.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            uploadBox.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
        
        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            uploadBox.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileSelect();
            }
        });
        
        fileInput.addEventListener('change', handleFileSelect);
        
        function handleFileSelect() {
            const file = fileInput.files[0];
            if (!file) return;
            
            if (!file.type.match('image.*')) {
                alert('Please select an image file.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                previewPlaceholder.style.display = 'none';
                sendBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        }
        
        // URL Input
        urlInput.addEventListener('input', () => {
            if (urlInput.value.trim() !== '') {
                sendBtn.disabled = false;
            } else {
                sendBtn.disabled = fileInput.files.length === 0;
            }
        });
        
        // Send Button
        sendBtn.addEventListener('click', async () => {
            // Check daily limit for unregistered users
            if (!isRegistered && dailyUsage >= 3) {
                sendBtn.disabled = true;
                limitMessage.style.display = 'flex';
                return;
            }
            
            let imageData;
            
            if (fileInput.files.length) {
                imageData = await fileToBase64(fileInput.files[0]);
            } else if (urlInput.value.trim() !== '') {
                const imageUrl = urlInput.value.trim();
                try {
                    imageData = await urlToBase64(imageUrl);
                    // Update preview image for URL input
                    previewImage.src = imageUrl;
                    previewImage.style.display = 'block';
                    previewPlaceholder.style.display = 'none';
                } catch (error) {
                    alert('Could not load image from URL due to browser security (CORS policy).\n\nThis is a common issue when the image server does not permit cross-origin requests.\n\nPlease try downloading the image to your computer and uploading it directly using the "Select Image" button.');
                    return;
                }
            } else {
                alert('Please upload an image or enter an image URL.');
                return;
            }
            
            // Show loading screen
            loadingScreen.classList.add('active');
            loadingText.textContent = 'Analyzing image...';
            
            // Increment daily usage for unregistered users
            if (!isRegistered) {
                dailyUsage++;
                localStorage.setItem('dailyUsage', dailyUsage);
                
                if (dailyUsage >= 3) {
                    sendBtn.disabled = true;
                    limitMessage.style.display = 'flex';
                }
            }
            
            // Call the image analysis function
            analyzeImage(imageData, currentVersion);
        });
        
        // Helper functions
        function fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            });
        }
        
        function urlToBase64(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/jpeg').split(',')[1]);
                };
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = url;
            });
        }
        
        // Image analysis function with Gemini API
        async function analyzeImage(imageData, version) {
            loadingText.textContent = 'Analyzing image with Sinha Ai...';
            loadingScreen.classList.add('active');
            
            try {
                // Prepare the prompt based on version
                let prompt = "Analyze this image and create a basic prompt describing the main elements, colors, and composition. Focus on the most obvious features. Provide only the final prompt text, without any extra explanation or tags.";

                if (version === '2.0' || version === '3.0') {
                    const thinkingInstructions = version === '2.0' 
                        ? `The thinking process should cover:
1.  Foreground, midground, and background elements.
2.  Color palette, lighting conditions, and mood.
3.  Textures and spatial relationships.`
                        : `The thinking process should deconstruct it into:
1.  Fundamental components and artistic style.
2.  Emotional tone and atmosphere.
3.  Subtle details and nuances for a professional-grade result.`;

                    prompt = `First, provide a step-by-step thinking process for analyzing this image. Each step should start with "Thinking:".
After the thinking process, provide the final, complete prompt for an AI image generator. The prompt should be a single, well-structured paragraph enclosed within <prompt> and </prompt> tags.
Do not include the word "prompt" inside the <prompt> tags.
${thinkingInstructions}`;
                }
                
                // Show analysis section
                analysisSection.style.display = 'block';
                actionButtons.innerHTML = '';
                thinkingProcess.textContent = '';
                generatedPrompt.textContent = '';
                
                if (version === '3.0') {
                    actionButtons.innerHTML = `
                        <button class="btn btn-warning" id="generateImageBtn">
                            <span>Generate Image</span>
                            <span>🎨</span>
                        </button>
                    `;
                    
                    document.getElementById('generateImageBtn').addEventListener('click', () => {
                        window.open('https://labs.google/fx/tools/whisk', '_blank');
                    });
                }
                
                // Call Gemini API with the image
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                {
                                    inlineData: {
                                        mimeType: "image/jpeg",
                                        data: imageData
                                    }
                                }
                            ]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 32,
                            topP: 0.95,
                            maxOutputTokens: 2048
                        }
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                
                const data = await response.json();
                const fullResponse = data.candidates[0].content.parts[0].text;

                if (version === '1.0') {
                    // Basic version, response is just the prompt
                    await typeText(fullResponse, generatedPrompt);
                } else {
                    // Advanced versions with thinking process and prompt
                    const promptMatch = fullResponse.match(/<prompt>([\s\S]*?)<\/prompt>/);
                    const finalPrompt = promptMatch ? promptMatch[1].trim() : "Could not extract prompt. Here is the full response:\n" + fullResponse;
                    
                    const thinkingText = fullResponse.replace(/<prompt>[\s\S]*?<\/prompt>/, '').trim();
                    
                    await typeText(thinkingText, thinkingProcess);
                    await typeText(finalPrompt, generatedPrompt);
                }
                
            } catch (error) {
                console.error('Image Analysis Error:', error);
                
                // Fallback to simulated response if API fails
                const fallbackResponses = {
                    '1.0': "A landscape with mountains in the background, a lake in the foreground, and trees on the sides. The scene is during sunset with warm colors reflecting on the water. Highly detailed, 4K, realistic style.",
                    '2.0': "A breathtaking mountain landscape at sunset, with snow-capped peaks reflecting the warm golden light. A crystal-clear alpine lake in the foreground perfectly mirrors the mountains and colorful sky. Lush evergreen trees frame the composition on both sides. The scene has a peaceful, serene atmosphere with vibrant colors transitioning from warm oranges to cool purples. Ultra-detailed, photorealistic rendering with precise lighting and reflections, 8K resolution.",
                    '3.0': "An awe-inspiring alpine landscape captured during the golden hour, with dramatic lighting that emphasizes the texture of the snow-capped mountain peaks. The composition follows the rule of thirds, with the majestic mountains occupying the top two-thirds of the frame, and the perfectly still lake reflecting the scene in the lower third. The color palette transitions from deep blues in the shadows to vibrant oranges and pinks in the highlights, creating a striking contrast. Subtle details like individual trees on the mountain slopes, small ripples in the water near the shore, and wispy clouds in the sky add depth and realism. The image has a cinematic quality with slightly enhanced saturation and contrast for emotional impact. Rendered in ultra-high 16K resolution with ray-traced lighting for photorealistic quality, suitable for professional landscape photography or high-end game environments."
                };
                
                thinkingProcess.textContent = 'An error occurred with the API. This is a simulated response.';
                generatedPrompt.textContent = '';
                await typeText(fallbackResponses[version] || fallbackResponses['1.0'], generatedPrompt);
                
                alert('API request failed. Using simulated response for demonstration.');
            } finally {
                loadingScreen.classList.remove('active');
            }
        }
        
        // Helper function for typing animation
        async function typeText(text, element) {
            for (let i = 0; i < text.length; i++) {
                element.textContent += text[i];
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        
        // Copy button
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(generatedPrompt.textContent)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });